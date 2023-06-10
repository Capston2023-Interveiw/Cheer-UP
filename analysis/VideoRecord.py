import cv2
from threading import Thread
import time

class VideoRecorder:

    def __init__(self):
        self.fourcc = cv2.VideoWriter_fourcc(*'DIVX')
        self.videoWriter = cv2.VideoWriter('test.mp4', self.fourcc, 10.0, (640, 360))
    
    def record(self, out):
        while(self.rec):
            print("record..")
            time.sleep(0.05)
            out.write(self.rec_frame)

    def recStart(self, out):
        self.rec = True
        self.videoTread = Thread(target = self.record, args=[out])
        self.videoTread.start()

    def stop(self):
        self.rec = False
        self.videoWriter.release()
