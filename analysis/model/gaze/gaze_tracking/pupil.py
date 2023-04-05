import numpy as np
import cv2

class Pupil(object):
    """
    This class detects the iris of an eye and estimates the position of the pupil
    눈의 직경과 동공의 위치를 측정하는 클래스
    """

    def __init__(self, eye_frame, threshold):
        self.iris_frame = None
        self.threshold = threshold
        self.x = None
        self.y = None
        self.detect_iris(eye_frame)

    @staticmethod
    def image_processing(eye_frame, threshold):
        """Performs operations on the eye frame to isolate the iris

        Arguments:
            eye_frame (numpy.ndarray): Frame containing an eye and nothing else
            threshold (int): Threshold value used to binarize the eye frame

        Returns:
            A frame with a single element representing the iris
            눈만 감싸고 있는 부분이 new_frame이자 회색 처리가 되는 부분
        """
        kernel = np.ones((3, 3), np.uint8)
        new_frame = cv2.bilateralFilter(eye_frame, 10, 15, 15)
        new_frame = cv2.erode(new_frame, kernel, iterations=3)
        new_frame = cv2.threshold(new_frame, threshold, 255, cv2.THRESH_BINARY)[1]

        return new_frame

    def detect_iris(self, eye_frame):
        """Detects the iris and estimates the position of the iris by calculating the centroid.
            동공을 찾고 무게중심을 계산해서 동공의 위치를 측정한다.
        Arguments:
            eye_frame (numpy.ndarray): Frame containing an eye and nothing else
        """
        self.iris_frame = self.image_processing(eye_frame, self.threshold)

        #CHAIN_APPROX_NONE : contour를 구성하는 모든 점을 저장함.
        #TREE: 모든 contour를 추출하고, 2번째 return 값인 hierarchy의 값에 영향을 줌.
        contours, _ = cv2.findContours(self.iris_frame, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)[-2:] 
        contours = sorted(contours, key=cv2.contourArea)

        try:
            moments = cv2.moments(contours[-2])
            self.x = int(moments['m10'] / moments['m00']) #무게중심 구하는 공식
            self.y = int(moments['m01'] / moments['m00'])

        except (IndexError, ZeroDivisionError):
            pass

