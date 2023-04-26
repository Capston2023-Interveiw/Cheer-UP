import time
import cv2
import imutils
import platform
import wave
import numpy as np
from threading import Thread
from queue import Queue

from model.gaze.gaze_tracking.gaze_tracking import GazeTracking
from model.gaze.gaze import run_gaze
from model.posture.PoseProject import Posture
from model.face.real_time_video import run_face
from model.language.language import SttService
import mediapipe as mp
import pyaudio

class DectectionModel:
    def __init__(self):
        self.mp_holistic = mp.solutions.holistic
        self.holistic = self.mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5)
        self.mp_drawing = mp.solutions.drawing_utils
        self.postureClass = Posture(self.holistic)
        self.gazeTracking = GazeTracking()
        self.gazeFeedback = []
        self.postureFeedback = []
        self.expressionFeedback = []
        self.current_time = time.time()
        self.preview_time = time.time()
        self.gazeCount = 0
        self.shoulderCount = 0
        self.postureCount = 0
        self.expressionCount = 0
        self.face = None
        self.gaze = None
        self.shoulder = None
        self.head = None
        self.x_left = 0
        self.y_left = 0
        self.x_right = 0
        self.y_right = 0
        self.fX = 0
        self.fY = 0
        self.fW = 0
        self.fH = 0
        self.faceColor = (0, 0, 255)
        self.gazeColor = (0, 0, 255)
        self.postureColor = (0, 0, 255)
        
    def detection(self, frame):
        self.current_time = time.time()
        fps = 1 / (self.current_time - self.preview_time)
        self.preview_time = self.current_time
        fps += 1
        posture = self.postureClass.run_posture(frame)
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faceResult = run_face(frame)
        if run_face(frame) is not None:
            self.face, self.fX, self.fY, self.fW, self.fH = faceResult
        self.gaze, self.x_left, self.y_left, self.x_right, self.y_right = run_gaze(frame, self.gazeTracking)
        if self.gaze == "left" or self.gaze == "right":
            self.gazeCount += 1
            self.gazeColor = (255, 0 , 0)
            if self.gazeCount >= 3 * fps:
                self.gazeFeedback.append(self.gaze)
                self.gazeCount = 0
        else:
            self.gazeColor = (0, 0, 255)
        if posture != None:
            self.head = posture[0]
            self.shoulder = posture[1]
            if posture[0] == 'Bad':
                self.postureCount += 1
                if self.postureCount >= 5 * fps:
                    self.postureFeedback.append(posture[0])
                    self.postureCount = 0
            if posture[1]:
                self.shoulderCount += 1
                if self.shoulderCount >= 5 * fps:
                    self.postureFeedback.append("어깨 비대칭")
                    self.shoulderCount = 0
        if self.face != None:
            if self.face != "happy" and self.face != "neutral":
                self.expressionCount += 1
                if self.expressionCount >= 5 * fps:
                    self.expressionFeedback.append(f"{self.face}한 표정")
                    self.expressionCount = 0

    def result(self):
        gazeScore = 20
        postureScore = 20
        expressionScore = 20
        if len(self.gazeFeedback) > 2:
            gazeScore -= (len(self.gazeFeedback) - 2)
        
        if gazeScore < 0:
            gazeScore = 0
        
        if len(self.postureFeedback) > 2:
            postureScore -= (len(self.postureFeedback) - 2)

        if postureScore < 0:
            postureScore = 0
        
        if len(self.expressionFeedback) > 2:
            expressionScore -= (len(self.expressionFeedback) - 2)

        if expressionScore < 0:
            expressionScore = 0

        stt = SttService("./model/language/record.wav")
        stt.getScripts()
        while stt.isEnd == False:
            interjectionResult = stt.getInterjectionResult()
            speedResult = stt.getSpeedResult()
        time.sleep(2)
        content = {
            "gaze": {
                "field": "gaze",
                "score": gazeScore,
                "feed_back": self.gazeFeedback
            },
            "posture": {
                "field": "posture",
                "score": postureScore,
                "feed_back": self.postureFeedback
            },
            "face": {
                "field": "face",
                "score": expressionScore,
                "feed_back": self.expressionFeedback
            },
            "interjection" : interjectionResult,
            "speed" : speedResult
        }
        return content
    
class RecordThread:

    def __init__(self, audiofile='./model/language/record.wav'):
        self.thread = None
        self.audio = pyaudio.PyAudio()
        self.bRecord = True
        self.audiofile = audiofile
        self.chunk = 1024
        self.format = pyaudio.paInt16
        self.channels = 1
        self.rate = 16000
        self.wavstream = None
        self.wavfile = None

    def run(self):
        self.wavstream = self.audio.open(format=self.format,
                        channels=self.channels,
                        rate=self.rate,
                        input=True,
                        frames_per_buffer=self.chunk)
        self.wavfile = wave.open(self.audiofile, 'wb')
        self.wavfile.setnchannels(self.channels)
        self.wavfile.setsampwidth(self.audio.get_sample_size(self.format))
        self.wavfile.setframerate(self.rate)
        if self.thread is None:
            self.thread = Thread(target=self.record, args=())
            self.thread.daemon = False
            self.thread.start()
        self.bRecord = True

    def record(self):
        while True:
            if self.bRecord:
                self.wavfile.writeframes(self.wavstream.read(self.chunk))

    def stoprecord(self):
        self.bRecord = False
        time.sleep(1)
        self.wavstream.stop_stream()
        self.wavstream.close()
        self.audio.terminate()
        self.wavfile.close()
        self.wavfile = None

class Camera:
    
    def __init__(self):
        
        if cv2.ocl.haveOpenCL() :
            cv2.ocl.setUseOpenCL(True)
        self.capture = None
        self.width = 640
        self.height = 360
        self.fourcc = cv2.VideoWriter_fourcc(*'XVID')
        self.video = cv2.VideoWriter("test.avi", self.fourcc, cv2.CAP_PROP_FPS, (self.width, self.height))
        self.thread = None
        self.stat = False
        self.videoWrite = False
        self.current_time = time.time()
        self.preview_time = time.time()
        self.sec = 0
        self.Q = Queue(maxsize=128)
        self.started = False
        self.model = DectectionModel()
        self.soundRecord = None

    def run(self, src = 0) :
        
        self.stop()

        self.soundRecord = RecordThread()
        if platform.system() == 'Windows' :        
            self.capture = cv2.VideoCapture(src , cv2.CAP_DSHOW)
        
        else :
            self.capture = cv2.VideoCapture(src)
            
        self.capture.set(cv2.CAP_PROP_FRAME_WIDTH, self.width)
        self.capture.set(cv2.CAP_PROP_FRAME_HEIGHT, self.height)

        self.soundRecord.run()
        if self.thread is None:
            self.thread = Thread(target=self.update, args=())
            self.thread.daemon = False
            self.thread.start()
        self.started = True
        self.videoWrite = True
    
    def stop(self):
        
        self.started = False
        if self.capture is not None:
            self.capture.release()
            self.video.release()
            self.soundRecord.bRecord = False
            self.soundRecord.stoprecord()
            self.videoWrite = False
            self.clear()
            
    def update(self):
        while True:
            if self.started:
                (grabbed, frame) = self.capture.read()
                if grabbed:
                    self.Q.put(frame)
                    self.model.detection(frame)                    
           
    def clear(self):
        with self.Q.mutex:
            self.Q.queue.clear()

    def read(self):
        return self.Q.get()

    def blank(self):
        
        return np.ones(shape=[self.height, self.width, 3], dtype=np.uint8)
    
    def bytescode(self):
        
        if not self.capture.isOpened():
            
            frame = self.blank()

        else :

            frame = imutils.resize(self.read(), width=int(self.width) )
            cv2.putText(frame, "face: " + str(self.model.face), (30, 45), cv2.FONT_HERSHEY_DUPLEX, 0.7, (147, 58, 31), 1)
            cv2.putText(frame, "head: " + str(self.model.head), (30, 75), cv2.FONT_HERSHEY_DUPLEX, 0.7, (147, 58, 31), 1)
            cv2.putText(frame, "shoulder: " + str(self.model.shoulder), (250, 45), cv2.FONT_HERSHEY_DUPLEX, 0.7, (147, 58, 31), 1)
            cv2.putText(frame, "gaze: " + str(self.model.gaze), (250, 75), cv2.FONT_HERSHEY_DUPLEX, 0.7, (147, 58, 31), 1)
            color = (0, 255, 0)
            cv2.line(frame, (self.model.x_left - 5, self.model.y_left), (self.model.x_left + 5, self.model.y_left), color)
            cv2.line(frame, (self.model.x_left, self.model.y_left - 5), (self.model.x_left, self.model.y_left + 5), color)
            cv2.line(frame, (self.model.x_right - 5, self.model.y_right), (self.model.x_right + 5, self.model.y_right), color)
            cv2.line(frame, (self.model.x_right, self.model.y_right - 5), (self.model.x_right, self.model.y_right + 5), color)
            cv2.rectangle(frame, (self.model.fX, self.model.fY), (self.model.fX + self.model.fW, self.model.fY + self.model.fH), (0, 0, 255), 2)
            if self.model.postureClass.results is not None:
                self.model.mp_drawing.draw_landmarks(frame, self.model.postureClass.results.pose_landmarks, self.model.mp_holistic.POSE_CONNECTIONS, 
                                        self.model.mp_drawing.DrawingSpec(color=(245,117,66), thickness=0, circle_radius=0),
                                        self.model.mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2)
                                        )
            self.video.write(frame)
            if self.stat:  
                cv2.rectangle(frame, (0,0), (120,30), (0,0,0), -1)
                fps = 'FPS : ' + str(self.fps())
        return cv2.imencode('.jpg', frame )[1].tobytes()
    
    def fps(self):
        
        self.current_time = time.time()
        self.sec = self.current_time - self.preview_time
        self.preview_time = self.current_time
        
        if self.sec > 0 :
            fps = round(1/(self.sec),1)
            
        else :
            fps = 1
            
        return fps
    
    def __exit__(self) :
        print( '* streamer class exit')
        self.capture.release()