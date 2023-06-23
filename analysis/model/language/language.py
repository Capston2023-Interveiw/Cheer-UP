import requests
import json
from model.language.speed import get_duration, scripts_length, speaking_speed
from model.language.time_conversion import time_conversion
from model.language.interjection import check_sentence
from model.language.sttAPI import getScripts, getSttToken

class SttService:

  def __init__(self, audio_path):
    
    self.token = getSttToken()
    self.audio_path = audio_path
    self.scripts = ""
    self.result = {}
    self.isEnd = False

  def getScripts(self):
    self.isEnd = False
    self.result = getScripts(self.token, self.audio_path)
    
    for content in self.result:
      self.scripts += (content['msg'] + " ")
    self.scripts = self.scripts.replace('.', ' ')

  def interjectionScore(self, interjections):
    score = 20
    if len(interjections) > 2:
      score = 20 - (len(interjections) - 2)
      if score < 0:
        score = 0
    return score

  def getInterjectionResult(self):
    
    interjections = []
    timestamp = []
    interjections = check_sentence(self.scripts)

    count = 0
    # 타임스탬프 추출
    for interjection in interjections:
      for content in range(len(self.result)):
        if self.result[content]['msg'] == interjection and content > count:
          timestamp.append(time_conversion(self.result[content]['start_at']))
          count = content
          break
    count = 0

    content = {
      "analysis_id": 4,
      "score": self.interjectionScore(interjections),
      "feedback": interjections,
      "time_stamp": timestamp
    }
    print(content)
    return content

  def getSpeedResult(self):
    time = get_duration(self.audio_path)
    length = scripts_length(self.scripts)
    speed, score = speaking_speed(time, length)
    content = {
      "field": 5,
      "score": score,
      "feedback": speed,
      "time_stamp": []
    }
    self.isEnd = True
    return content