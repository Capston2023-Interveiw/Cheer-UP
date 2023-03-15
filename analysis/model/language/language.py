import requests
import json
from speed import get_duration, scripts_length, speaking_speed
from time_conversion import time_conversion
from interjection import check_sentence
from sttAPI import getScripts, getSttToken

token = getSttToken()
result = getScripts(token)
scripts = ""

for content in result:
  scripts += (content['msg'] + " ")

scripts = scripts.replace('.', ' ')

def interjectionScore(interjections):
  score = 20
  if len(interjections) > 2:
    score = 20 - (len(interjections) - 2)
  return score

def getInterjectionResult():
  interjections = []
  timestamp = []
  interjections = check_sentence(scripts)

  count = 0
  # 타임스탬프 추출
  for interjection in interjections:
    for content in range(len(result)):
      if result[content]['msg'] == interjection and content > count:
        timestamp.append(time_conversion(result[content]['start_at']))
        count = content
        break
  count = 0

  content = {
    "field": "interjection",
    "score": interjectionScore(interjections),
    "minus_point": interjections,
    "time_stamp": timestamp
  }
  return json.dumps(content, ensure_ascii = False)

def getSpeedResult():
  audio_path = "./analysis/model/language/sample.wav"
  time = get_duration(audio_path)
  length = scripts_length(scripts)
  speed, score = speaking_speed(time, length)
  content = {
    "field": "speed",
    "score": score,
    "minus_point": speed,
    "time_stamp": []
  }
  return json.dumps(content, ensure_ascii = False)

print(getInterjectionResult())
print(getSpeedResult())