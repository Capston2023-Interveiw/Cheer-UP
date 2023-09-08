import mediapipe as mp
import time
import cv2

from model.gaze.gaze_tracking.gaze_tracking import GazeTracking
from model.gaze.gaze import run_gaze
from model.posture.PoseProject import Posture
from model.face.real_time_video import run_face
from model.language.language import SttService
from createwordcloud import createWordCloud
from DataDao import DataDao

FACE_ANALYSIS_ID=1
POSTURE_ANALYSIS_ID=2
GAZE_ANALYSIS_ID=3
INTERJECTION_ANALYSIS_ID=4
SPEED_ANALYSIS_ID=5
FACE_SUMMARY="부정적인 표정: %d회"
GAZE_SUMMARY="왼쪽: %d회, 오른쪽: %d회"
POSTURE_SUMMARY="고개 치우쳐짐: %d회, 어깨 비대칭: %d회"
SPEED_SUMMARY="%s"
INTERJECTION_SUMMARY="필요없는 감탄사 %d회 반복"


class Detection:

    def __init__(self, video_id):
        self.thread = None
        self.mp_holistic = mp.solutions.holistic
        self.holistic = self.mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5)
        self.mp_drawing = mp.solutions.drawing_utils
        self.postureClass = Posture(self.holistic)
        self.gazeTracking = GazeTracking()
        self.gazeFeedback = []
        self.postureFeedback = []
        self.expressionFeedback = []
        self.expressionTimeStamp = []
        self.gazeTimeStamp = []
        self.postureTimeStamp = []
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
        self.startTime = None
        self.fps = 10
        self.database = DataDao()
        self.video_id = video_id
        self.face_summary = 0
        self.gaze_left_summary = 0
        self.gaze_right_summary = 0
        self.posture_summary = 0
        self.head_summary = 0

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
        if (self.gaze == "left") or (self.gaze == "right"):
            self.gazeCount += 1
            self.gazeColor = (248, 72, 216)
            if self.gazeCount >= 2 * self.fps:
                if (self.gaze == "left"):
                    reason = "왼쪽"
                    self.gaze_left_summary += 1
                elif (self.gaze == "right"):
                    reason = "오른쪽"
                    self.gaze_right_summary += 1
                self.gazeFeedback.append(self.gaze)
                timestamp = int(time.time() - self.startTime)
                self.gazeTimeStamp.append(timestamp)
                self.gazeCount = 0
                self.gazeColor = (0, 0, 255)
                self.database.insertLog(reason, self.timestamp_form(timestamp), GAZE_ANALYSIS_ID, self.video_id)
        else:
            self.gazeColor = (2, 247, 234)

    def checkPosture(self, posture):
        self.head = posture[0]
        self.shoulder = posture[1]
        if posture[0] == 'Bad':
            self.postureCount += 1
            self.headColor = (248, 72, 216)
            reason = "고개 비대칭"
            if self.postureCount >= 2 * self.fps:
                self.head_summary += 1
                self.postureFeedback.append(posture[0])
                timestamp = int(time.time() - self.startTime)
                self.postureTimeStamp.append(timestamp)
                self.postureCount = 0
                self.headColor = (0, 0, 255)
                self.database.insertLog(reason, self.timestamp_form(timestamp), POSTURE_ANALYSIS_ID, self.video_id)
        else:
            self.headColor = (2, 247, 234)

        if posture[1]:
            self.shoulderCount += 1
            self.shoulderColor = (248, 72, 216)
            if self.shoulderCount >= 2 * self.fps:
                self.posture_summary += 1
                self.postureFeedback.append("어깨 기울어짐")
                timestamp = int(time.time() - self.startTime)
                self.postureTimeStamp.append(timestamp)
                self.shoulderCount = 0
                self.shoulderColor = (0, 0, 255)
                self.database.insertLog("어깨 기울어짐", self.timestamp_form(timestamp), POSTURE_ANALYSIS_ID, self.video_id)
        else:
            self.shoulderColor = (2, 247, 234)

    def checkFace(self):
        emotion = {"angry": "화난 표정", "disgust": "혐오스러운 표정", "scared": "무서워하는 표정", "sad": "슬픈 표정", "surprised": "당황하는 표정"}
        if self.face != "happy" and self.face != "neutral":
            self.expressionCount += 1
            self.faceColor = (248, 72, 216)
            if self.expressionCount >= 2 * self.fps:
                self.face_summary += 1
                self.expressionFeedback.append(emotion[self.face])
                timestamp = int(time.time() - self.startTime)
                self.expressionTimeStamp.append(timestamp)
                self.expressionCount = 0
                self.faceColor = (0, 0, 255)
                self.database.insertLog(emotion[self.face], self.timestamp_form(timestamp), FACE_ANALYSIS_ID, self.video_id)
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
        self.save_score(GAZE_ANALYSIS_ID, gazeScore)

        if len(self.postureFeedback) > 2:
            postureScore -= (len(self.postureFeedback) - 2)

            if postureScore < 0:
                postureScore = 0
        self.save_score(POSTURE_ANALYSIS_ID, postureScore)

        if len(self.expressionFeedback) > 2:
            expressionScore -= (len(self.expressionFeedback) - 2)
            if expressionScore < 0:
                expressionScore = 0
        self.save_score(FACE_ANALYSIS_ID, expressionScore)

        stt = SttService("./model/language/record.wav")
        script = stt.getScripts()
        print(script)
        totalSummary = createWordCloud(script)
        while stt.isEnd == False:
            interjectionResult = stt.getInterjectionResult()
            speedResult = stt.getSpeedResult()
        time.sleep(2)
        self.speed_score(speedResult)
        self.save_interjection_log(interjectionResult)
        totalScore = gazeScore + expressionScore + postureScore + speedResult['score'] + interjectionResult['score']
        self.database.insertScore(totalScore, self.video_id, None, 6, totalSummary)
    
    def save_score(self, analysis_id, score):
        if score == 20:
            feedback_id = 4 * (analysis_id - 1) + 1
        elif 15 <= score <= 19:
            feedback_id = 4 * (analysis_id - 1) + 2
        elif 10 <= score <= 14:
            feedback_id = 4 * (analysis_id - 1) + 3
        else:
            feedback_id = 4 * (analysis_id - 1) + 4
        summary = self.getSummary(analysis_id, score)
        self.database.insertScore(score, self.video_id, feedback_id, analysis_id, summary)

    def getSummary(self, analysis_id, score):
        if analysis_id==FACE_ANALYSIS_ID:
            return f"부정적인 표정: {self.face_summary}회"
        elif analysis_id==POSTURE_ANALYSIS_ID:
            return f"고개 치우쳐짐: {self.head_summary}회, 어깨 비대칭: {self.posture_summary}회"
        elif analysis_id==GAZE_ANALYSIS_ID:
            return f"왼쪽: {self.gaze_left_summary}회, 오른쪽: {self.gaze_right_summary}회"
        else:
            return f"필요없는 감탄사 {20-score}회 반복"
        
    
    def save_interjection_log(self, contents):
        self.save_score(contents['analysis_id'], contents['score'])
        time = ""
        for i in range(len(contents['feedback'])):
            time = 0
            log = contents['feedback'][i]
            if (i < len(contents['time_stamp'])):
                time = contents['time_stamp'][i]
            self.database.insertLog(log, time, GAZE_ANALYSIS_ID, self.video_id)


    def timestamp_form(self, time):
            second = time
            minute = 0
            if second > 60:
                minute += second // 60
                second -= 60 * minute
            return f"{minute}:{second}"
    
    def speed_score(self, speedResult):
        summary = SPEED_SUMMARY % speedResult['summary']
        self.database.insertScore(speedResult['score'], self.video_id, speedResult['feedback'], speedResult['field'], summary)