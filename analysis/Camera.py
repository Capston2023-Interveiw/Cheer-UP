import time
import cv2
import imutils
import platform
import numpy as np
from threading import Thread
from queue import Queue
from Detection import Detection
from Record import Record

class Camera:
    
    def __init__(self):
        if cv2.ocl.haveOpenCL() :
            cv2.ocl.setUseOpenCL(True)
        self.capture = None
        self.width = 640
        self.height = 360
        self.thread = None
        self.stat = False
        self.current_time = 1
        self.preview_time = 1
        self.sec = 0
        self.Q = Queue(maxsize=128)
        self.started = False
        self.detection = Detection()
        self.soundRecord = None
        self.fps = 10

    def run(self, src = 0):
        self.stop()

        self.soundRecord = Record()
        if platform.system() == 'Windows' :        
            self.capture = cv2.VideoCapture(src , cv2.CAP_DSHOW)
        
        else :
            self.capture = cv2.VideoCapture(src)
            
        self.capture.set(cv2.CAP_PROP_FRAME_WIDTH, self.width)
        self.capture.set(cv2.CAP_PROP_FRAME_HEIGHT, self.height)
        self.started = True
        # self.soundRecord.run()
        self.threadStart()
    
    def threadStart(self):
        if self.thread is None:
            self.thread = Thread(target=self.update, args=())
            self.thread.daemon = False
            self.thread.start()
        self.started = True

    def stop(self):
        self.started = False
        if self.capture is not None:
            # self.capture.release()
            # self.stopRecording()
            self.clear()


    def stopRecording(self):
        self.soundRecord.bRecord = False
        self.soundRecord.stopRecording()

    def update(self):
        while self.started:
            self.current_time = time.time() - self.preview_time
            if self.started:
                (grabbed, frame) = self.capture.read()
                if grabbed and (self.current_time > 1./self.fps):
                    self.preview_time = time.time()
                    self.Q.put(frame)
                    self.detection.detection(frame)
           
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
            self.visualize(frame)
            if self.stat:  
                cv2.rectangle(frame, (0,0), (120,30), (0,0,0), -1)
                fps = 'FPS : ' + str(self.fps())
        return cv2.imencode('.jpg', frame )[1].tobytes()
    
    def visualize(self, frame):
        cv2.putText(frame, "face: " + str(self.detection.face), (30, 45), cv2.FONT_HERSHEY_DUPLEX, 0.7, (147, 58, 31), 1)
        cv2.putText(frame, "head: " + str(self.detection.head), (30, 75), cv2.FONT_HERSHEY_DUPLEX, 0.7, (147, 58, 31), 1)
        cv2.putText(frame, "shoulder: " + str(self.detection.shoulder), (250, 45), cv2.FONT_HERSHEY_DUPLEX, 0.7, (147, 58, 31), 1)
        cv2.putText(frame, "gaze: " + str(self.detection.gaze), (250, 75), cv2.FONT_HERSHEY_DUPLEX, 0.7, (147, 58, 31), 1)
        cv2.line(frame, (self.detection.x_left - 5, self.detection.y_left), (self.detection.x_left + 5, self.detection.y_left), self.detection.gazeColor)
        cv2.line(frame, (self.detection.x_left, self.detection.y_left - 5), (self.detection.x_left, self.detection.y_left + 5), self.detection.gazeColor)
        cv2.line(frame, (self.detection.x_right - 5, self.detection.y_right), (self.detection.x_right + 5, self.detection.y_right), self.detection.gazeColor)
        cv2.line(frame, (self.detection.x_right, self.detection.y_right - 5), (self.detection.x_right, self.detection.y_right + 5), self.detection.gazeColor)
        cv2.rectangle(frame, (self.detection.fX, self.detection.fY), (self.detection.fX + self.detection.fW, self.detection.fY + self.detection.fH), self.detection.faceColor, 2)
        if self.detection.postureClass.results is not None:
            self.detection.mp_drawing.draw_landmarks(frame, self.detection.postureClass.results.pose_landmarks, {(12, 14), (11, 12), (11, 12)}, 
                                    None,
                                    self.detection.mp_drawing.DrawingSpec(color=self.detection.shoulderColor, thickness=2, circle_radius=4),
                                    )
            
            self.detection.mp_drawing.draw_landmarks(frame, self.detection.postureClass.results.face_landmarks, self.detection.mp_holistic.FACEMESH_CONTOURS, 
                                        None,
                                        self.detection.mp_drawing.DrawingSpec(color=self.detection.headColor, thickness=1, circle_radius=1)
                                    )
            
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