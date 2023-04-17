from tensorflow.keras.utils import img_to_array
import imutils
import cv2
import time
from keras.models import load_model
import numpy as np

def run_face():
    # parameters for loading data and images
    detection_model_path = 'haarcascade_files/haarcascade_frontalface_default.xml'
    emotion_model_path = 'models/_mini_XCEPTION.102-0.66.hdf5'

    # hyper-parameters for bounding boxes shape
    # loading models
    face_detection = cv2.CascadeClassifier(detection_model_path)
    emotion_classifier = load_model(emotion_model_path, compile=False)
    EMOTIONS = ["angry" ,"disgust","scared", "happy", "sad", "surprised",
    "neutral"]


    #feelings_faces = []
    #for index, emotion in enumerate(EMOTIONS):
    # feelings_faces.append(cv2.imread('emojis/' + emotion + '.png', -1))

    # starting video streaming
    cv2.namedWindow('your_face')
    camera = cv2.VideoCapture(0)
    score = 20
    # 감점되는 요소 들어갈 array
    feedback = []
    # 감점되는 요소 카운트
    bad_count = 0
    # 감점안되는 요소 카운트
    good_count = 0
    #previous time for fps
    Prev_time = 0
    #current time for fps
    Cur_time = 0

    while True:
        frame = camera.read()[1]

        Cur_time = time.time()
        fps = 1 / (Cur_time - Prev_time)
        Prev_time = Cur_time
        my_fps = fps + 1
        text = ""

        #reading the frame
        frame = imutils.resize(frame,width=300)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_detection.detectMultiScale(gray,scaleFactor=1.1,minNeighbors=5,minSize=(30,30),flags=cv2.CASCADE_SCALE_IMAGE)
        
        canvas = np.zeros((250, 300, 3), dtype="uint8")
        frameClone = frame.copy()
        if len(faces) > 0:
            faces = sorted(faces, reverse=True,
            key=lambda x: (x[2] - x[0]) * (x[3] - x[1]))[0]
            (fX, fY, fW, fH) = faces
                        # Extract the ROI of the face from the grayscale image, resize it to a fixed 28x28 pixels, and then prepare
                # the ROI for classification via the CNN
            roi = gray[fY:fY + fH, fX:fX + fW]
            roi = cv2.resize(roi, (64, 64))
            roi = roi.astype("float") / 255.0
            roi = img_to_array(roi)
            roi = np.expand_dims(roi, axis=0)
            
            
            preds = emotion_classifier.predict(roi)[0]
            emotion_probability = np.max(preds)
            label = EMOTIONS[preds.argmax()]


            if label=="angry" or label=="disgust" or label=="scared" or label=="sad" or label=="surprised":
                bad_count += 1
                # 2초 이상이면 점수 감점
                if bad_count >= 2 * my_fps and score >= 0:
                    score = score - 1
                    feedback.append(label+"표정을 지음")
                    bad_count = 0 # 횟수 초기화
                    print(feedback)

            elif label=="happy" or label=="neutral":
                if good_count >= 2 * my_fps and score >= 0:

                    feedback.append(label+"표정을 지음")
                    good_count = 0 # 횟수 초기화
                    print(feedback)
        
            # 만약 점수가 0보다 작을때는 0점으로 계속 보여줌
            if score < 0:
                score = 0

            
            print(score)

        else: continue

    
        for (i, (emotion, prob)) in enumerate(zip(EMOTIONS, preds)):
                    # construct the label text
                    text = "{}: {:.2f}%".format(emotion, prob * 100)

                    # draw the label + probability bar on the canvas
                # emoji_face = feelings_faces[np.argmax(preds)]

                    
                    w = int(prob * 300)
                    cv2.rectangle(canvas, (7, (i * 35) + 5),
                    (w, (i * 35) + 35), (0, 0, 255), -1)
                    cv2.putText(canvas, text, (10, (i * 35) + 23),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.45,
                    (255, 255, 255), 2)
                    cv2.putText(frameClone, label, (fX, fY - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 0, 255), 2)
                    cv2.rectangle(frameClone, (fX, fY), (fX + fW, fY + fH),
                                (0, 0, 255), 2)
    #    for c in range(0, 3):
    #        frame[200:320, 10:130, c] = emoji_face[:, :, c] * \
    #        (emoji_face[:, :, 3] / 255.0) + frame[200:320,
    #        10:130, c] * (1.0 - emoji_face[:, :, 3] / 255.0)


        cv2.imshow('your_face', frameClone)
        cv2.imshow("Probabilities", canvas)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    camera.release()
    cv2.destroyAllWindows()
