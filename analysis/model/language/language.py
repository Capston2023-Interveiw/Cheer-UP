import requests
import json
from time_conversion import time_conversion
from interjection import check_sentence
from dotenv import load_dotenv
import os 
import time

load_dotenv()

# 토큰 불러오기
token = requests.post(
    'https://openapi.vito.ai/v1/authenticate',
    data={'client_id': os.environ.get('stt_id'),
          'client_secret': os.environ.get('stt_secret')}
)
token.raise_for_status()
token_json = token.json()


# 음성 파일 분석 요청
config = {
  "diarization": {
    "use_verification": False
  },
  "use_multi_channel": False
}

response = requests.post(
    'https://openapi.vito.ai/v1/transcribe',
    headers={'Authorization': 'bearer '+ token_json['access_token']},
    data={'config': json.dumps(config)},
    files={'file': open('./analysis/model/language/sample.wav', 'rb')}
)
response.raise_for_status()
response_json = response.json()
stt_id = response_json['id']

# 분석 완료 내용 불러오기
while True:
  resp = requests.get(
    'https://openapi.vito.ai/v1/transcribe/' + stt_id,
    headers={'Authorization': 'bearer ' + token_json['access_token']},
  )
  resp.raise_for_status()
  resp_json = resp.json()
  if(resp_json['status'] == 'completed'):
    result = resp_json['results']['utterances']
    break
  time.sleep(0.5)

scripts = ""
interjection = []
timestamp = []
for content in result:
  scripts += (content['msg'] + " ")
  # if (len(content['msg']) == 1):
  #   interjection.append(content['msg'])
  #   timestamp.append(time_conversion(content['start_at']))
print(scripts)
print("-----------감탄사--------------")
interjection = check_sentence(scripts)
print("-----------time--------------")
print(timestamp)