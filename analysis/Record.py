import pyaudio
import wave
import time
from threading import Thread

class Record:

    def __init__(self, audiofile='./model/language/record.wav'):
        self.thread = None
        self.audio = pyaudio.PyAudio()
        self.bRecord = False
        self.audiofile = audiofile
        self.chunk = 1024
        self.format = pyaudio.paInt16
        self.channels = 1
        self.rate = 16000
        self.wavstream = None
        self.wavfile = None

    def startRecording(self):
        self.run()

    def stopRecording(self):
        self.bRecord = False
        self.thread.join()
        self.stopWavstream()
        self.saveWavfile()
        time.sleep(1)

    def run(self):
        self.wavstream = self.audio.open(format=self.format,
                        channels=self.channels,
                        rate=self.rate,
                        input=True,
                        frames_per_buffer=self.chunk)
        self.wavfile = wave.open(self.audiofile, 'wb')
        self.wavfile.setnchannels(self.channels)
        self.wavfile.setsampwidth(self.audio.get_sample_size(self.format))
        self.wavfile.setframerate(self.rate)
        self.startThread()

    def startThread(self):
        if self.thread is None:
            self.thread = Thread(target=self.record, args=())
            self.thread.daemon = False
            self.thread.start()
        self.bRecord = True

    def record(self):
        while True:
            if self.bRecord:
                self.wavfile.writeframes(self.wavstream.read(self.chunk))

    def stopWavstream(self):
        self.wavstream.stop_stream()
        self.wavstream.close()
        self.audio.terminate()

    def saveWavfile(self):
        if self.wavfile is not None:
            self.wavfile.close()
            self.wavfile = None