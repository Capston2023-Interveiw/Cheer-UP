from tensorflow.keras.utils import img_to_array
import imutils
import cv2
import time
from keras.models import load_model
import numpy as np

# parameters for loading data and images
detection_model_path = './model/face/haarcascade_files/haarcascade_frontalface_default.xml'
emotion_model_path = './model/face/models/_mini_XCEPTION.102-0.66.hdf5'

# loading models
face_detection = cv2.CascadeClassifier(detection_model_path)
emotion_classifier = load_model(emotion_model_path, compile=False)

def run_face(frame):

    global detection_model_path, emotion_model_path, face_detection, emotion_classifier

    EMOTIONS = ["angry", "disgust", "scared", "happy", "sad", "surprised", "neutral"]

    #reading the frame
    frame = imutils.resize(frame, width = 640, height = 360)
    gray = frame
    faces = face_detection.detectMultiScale(gray,scaleFactor=1.1,minNeighbors=5,minSize=(30,30),flags=cv2.CASCADE_SCALE_IMAGE)
    
    if len(faces) > 0:
        faces = sorted(faces, reverse=True,
        key=lambda x: (x[2] - x[0]) * (x[3] - x[1]))[0]
        (fX, fY, fW, fH) = faces
        roi = gray[fY:fY + fH, fX:fX + fW]
        roi = cv2.resize(roi, (64, 64))
        roi = roi.astype("float") / 255.0
        roi = img_to_array(roi)
        roi = np.expand_dims(roi, axis=0)
        
        preds = emotion_classifier.predict(roi)[0]
        label = EMOTIONS[preds.argmax()]
        print(fX, fY, fW, fH)
        return label, fX, fY, fW, fH
    