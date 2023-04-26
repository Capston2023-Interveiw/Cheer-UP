import cv2
import time
from .gaze_tracking.gaze_tracking import GazeTracking


def run_gaze(frame, gaze):
    gaze.refresh(frame)
    x_left, y_left, x_right, y_right = gaze.annotated_frame()
    if gaze.is_right():
        return "right", x_left, y_left, x_right, y_right
    elif gaze.is_left():
        return "left", x_left, y_left, x_right, y_right
    return None, x_left, y_left, x_right, y_right