import time
import cv2
import imutils
import platform
import numpy as np
from threading import Thread
from queue import Queue

from model.gaze.gaze_tracking.gaze_tracking import GazeTracking
from model.gaze.gaze import run_gaze
from model.posture.PoseProject import run_posture

import mediapipe as mp

class DectectionModel:
    def __init__(self):
        self.mp_holistic = mp.solutions.holistic
        self.holistic = self.mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5)
        self.gaze = GazeTracking()
        self.gazeFeedback = []
        self.postureFeedback = []
        self.current_time = time.time()
        self.preview_time = time.time()
        self.gazeCount = 0
        self.shoulderCount = 0
        self.postureCount = 0
    
    def detection(self, frame):
        self.current_time = time.time()
        fps = 1 / (self.current_time - self.preview_time)
        self.preview_time = self.current_time
        fps += 1
        gaze = run_gaze(frame, self.gaze)
        posture = run_posture(frame, self.holistic)
        print(gaze)
        if gaze != None:
            self.gazeCount += 1
            if self.gazeCount >= 1 * fps:
                self.gazeFeedback.append(gaze)
                self.gazeCount = 0
        if posture != None:
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


class Camera:
    
    def __init__(self ):
        
        if cv2.ocl.haveOpenCL() :
            cv2.ocl.setUseOpenCL(True)
        self.capture = None
        self.thread = None
        self.width = 640
        self.height = 360
        self.stat = False
        self.current_time = time.time()
        self.preview_time = time.time()
        self.sec = 0
        self.Q = Queue(maxsize=128)
        self.started = False
        self.model = DectectionModel()

    def result(self):
        gazeScore = 20
        postureScore = 20
        if len(self.model.gazeFeedback) > 2:
            gazeScore -= (len(self.model.gazeFeedback) - 2)
        
        if gazeScore < 0:
            gazeScore = 0
        
        if len(self.model.postureFeedback) > 2:
            postureScore -= (len(self.model.postureFeedback) - 2)

        if postureScore < 0:
            postureScore = 0
        

        content = {
            "gaze": {
                "field": "gaze",
                "score": gazeScore,
                "feed_back": self.model.gazeFeedback
            },
            "posture": {
                "field": "posture",
                "score": postureScore,
                "feed_back": self.model.postureFeedback
            }
        }
        return content
    def run(self, src = 0 ) :
        
        self.stop()
    
        if platform.system() == 'Windows' :        
            self.capture = cv2.VideoCapture( src , cv2.CAP_DSHOW )
        
        else :
            self.capture = cv2.VideoCapture( src )
            
        self.capture.set(cv2.CAP_PROP_FRAME_WIDTH, self.width)
        self.capture.set(cv2.CAP_PROP_FRAME_HEIGHT, self.height)
        
        if self.thread is None :
            self.thread = Thread(target=self.update, args=())
            self.thread.daemon = False
            self.thread.start()
        
        self.started = True
    
    def stop(self):
        
        self.started = False
        
        if self.capture is not None :
            
            self.capture.release()
            self.clear()
            
    def update(self):
                    
        while True:

            if self.started :
                (grabbed, frame) = self.capture.read()
                self.model.detection(frame)
                if grabbed : 
                    self.Q.put(frame)
                          
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
        
            if self.stat :  
                cv2.rectangle( frame, (0,0), (120,30), (0,0,0), -1)
                fps = 'FPS : ' + str(self.fps())
                cv2.putText  ( frame, fps, (10,20), cv2.FONT_HERSHEY_PLAIN, 1, (0,0,255), 1, cv2.LINE_AA)
            
            
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