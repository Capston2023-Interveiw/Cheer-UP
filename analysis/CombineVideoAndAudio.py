import ffmpeg
import uuid
from connection.connection import putVideoToS3

def combineVideo(fname):
    video = ffmpeg.input('test.avi')
    audio = ffmpeg.input('./model/language/record.wav')
    out = ffmpeg.output(video, audio, f'./video/{fname}.mp4', vcodec='copy', acodec='aac', strict='experimental')
    out.run()
    file = open(f'./video/{fname}.mp4', 'rb')
    putVideoToS3(fname, file, 1)
    file.close()