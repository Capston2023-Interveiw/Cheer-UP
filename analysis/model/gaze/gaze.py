import cv2
import time
from .gaze_tracking.gaze_tracking import GazeTracking


def run_gaze(frame, gaze):
    gaze.refresh(frame)
    frame = gaze.annotated_frame()
    if gaze.is_right():
        return "right"

    elif gaze.is_left():
        return "left"
    return None