
import cv2
import time
from gaze_tracking import GazeTracking

def gazetracking_result():
    gaze = GazeTracking()
    webcam = cv2.VideoCapture(0)
    # 감점되는 요소 들어갈 array
    feedback = []
    # 왼쪽을 본 횟수 초기 세팅
    looking_left_count = 0
    # 오른쪽을 본 횟수 초기 세팅
    looking_right_count = 0
    #previous time for fps
    prev_time = 0
    #current time for fps
    cur_time = 0

    while True:
        # We get a new frame from the webcam
        _, frame = webcam.read()

        # We send this frame to GazeTracking to analyze it
        gaze.refresh(frame)
        cur_time = time.time()
        fps = 1 / (cur_time - prev_time)
        prev_time = cur_time
        my_fps = fps + 1
        frame = gaze.annotated_frame()
        text = ""

        if gaze.is_right():
            #text = "Looking right" #제외할 부분
            #오른쪽을 볼 때 왼쪽을 본 횟수가 증가 되고, 오른쪽을 본 횟수는 초기화됨.
            looking_right_count += 1
            looking_left_count = 0
            # 5초이상 보거나 score가 0 이상인 경우 점수가 1점씩 깎임.
            if looking_right_count >= 1 * my_fps:
                feedback.append("Looking right")
                looking_right_count = 0 # 횟수 초기화

        elif gaze.is_left():
            #text = "Looking left" #제외할 부분
            #오른쪽을 볼 때 오른쪽을 본 횟수가 증가 되고, 왼쪽을 본 횟수는 초기화됨.
            looking_left_count += 1
            looking_right_count = 0

            # 5초이상 보거나 score가 0 이상인 경우 점수가 1점씩 깎임.
            if looking_left_count >= 1 * my_fps:
                feedback.append("Looking left")
                looking_left_count = 0 # 횟수 초기화

            
        #cv2.putText(frame, text, (90, 60), cv2.FONT_HERSHEY_DUPLEX, 1.6, (147, 58, 31), 2)

        #left_pupil = gaze.pupil_left_coords()
        #right_pupil = gaze.pupil_right_coords()
        #cv2.putText(frame, "Left pupil:  " + str(left_pupil), (90, 130), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)
        #cv2.putText(frame, "Right pupil: " + str(right_pupil), (90, 165), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)
        score = 0
        if len(feedback) <= 20:
            score = 20 - len(feedback)

        cv2.imshow("시선 추적", frame)

        #key = cv2.waitkey(1)
        if cv2.waitKey(1) == 27:
            break

    
    webcam.release()
    cv2.destroyAllWindows()
    return score, feedback

tScore, feedback = gazetracking_result()
