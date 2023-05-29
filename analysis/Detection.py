import mediapipe as mp
import time
import cv2

from threading import Thread
from model.gaze.gaze_tracking.gaze_tracking import GazeTracking
from model.gaze.gaze import run_gaze
from model.posture.PoseProject import Posture
from model.face.real_time_video import run_face
from model.language.language import SttService

class Detection:

    def __init__(self):
        self.thread = None
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
        self.faceColor = (2, 247, 234)
        self.gazeColor = (2, 247, 234)
        self.shoulderColor = (2, 247, 234)
        self.headColor = (2, 247, 234)
        self.fps = 0

    def update(self, image):
		# if the background model is None, initialize it
        if self.bg is None:
            self.bg = image.copy().astype("float")
            return

		# update the background model by accumulating the weighted
		# average
        cv2.accumulateWeighted(image, self.bg, self.accumWeight)
                
    def detection(self, frame):
        if frame is not None:

            posture = self.postureClass.run_posture(frame)
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faceResult = run_face(frame)

            if faceResult is not None:
                self.face, self.fX, self.fY, self.fW, self.fH = faceResult
            self.gaze, self.x_left, self.y_left, self.x_right, self.y_right = run_gaze(frame, self.gazeTracking)

            if self.gaze != None:
                self.checkGaze()

            if posture != None:
                self.checkPosture(posture)

            if self.face != None:
                self.checkFace()
            
    def stop(self):
        self.isDetect = False
        self.thread.join()
        time.sleep(1)

    def checkGaze(self):
        if (self.gaze is "left") or (self.gaze is "right"):
            self.gazeCount += 1
            self.gazeColor = (248, 72, 216)
            if self.gazeCount >= 3 * self.fps:
                self.gazeFeedback.append(self.gaze)
                self.gazeCount = 0
                self.gazeColor = (0, 0, 255)
        else:
            self.gazeColor = (2, 247, 234)

    def checkPosture(self, posture):
        self.head = posture[0]
        self.shoulder = posture[1]
        if posture[0] == 'Bad':
            self.postureCount += 1
            self.headColor = (248, 72, 216)
            if self.postureCount >= 5 * self.fps:
                self.postureFeedback.append(posture[0])
                self.postureCount = 0
                self.headColor = (0, 0, 255)
        else:
            self.headColor = (2, 247, 234)
            
        if posture[1]:
            self.shoulderCount += 1
            self.shoulderColor = (248, 72, 216)
            if self.shoulderCount >= 5 * self.fps:
                self.postureFeedback.append("어깨 비대칭")
                self.shoulderCount = 0
                self.shoulderColor = (0, 0, 255)
        else:
            self.shoulderColor = (2, 247, 234)

    def checkFace(self):
        if self.face != "happy" and self.face != "neutral":
            self.expressionCount += 1
            self.faceColor = (248, 72, 216)
            if self.expressionCount >= 5 * self.fps:
                self.expressionFeedback.append(f"{self.face}한 표정")
                self.expressionCount = 0
                self.faceColor = (0, 0, 255)
        else:
            self.faceColor = (2, 247, 234)

    def calculateFps(self):
        self.current_time = time.time()
        self.fps = 1 / (self.current_time - self.preview_time)
        self.preview_time = self.current_time
        self.fps += 1
        
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
                "feedback": self.gazeFeedback
            },
            "posture": {
                "field": "posture",
                "score": postureScore,
                "feedback": self.postureFeedback
            },
            "face": {
                "field": "face",
                "score": expressionScore,
                "feedback": self.expressionFeedback
            },
            "interjection" : interjectionResult,
            "speed" : speedResult
        }
        return content