import ffmpeg

def combineVideo():
    video = ffmpeg.input('test.avi')
    audio = ffmpeg.input('./model/language/record.wav')
    out = ffmpeg.output(video, audio, './combine.mp4', vcodec='copy', acodec='aac', strict='experimental')
    out.run()