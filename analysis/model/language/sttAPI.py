import requests
import json
from dotenv import load_dotenv
import os 
import time

load_dotenv()

def getSttToken():
  # 토큰 불러오기
  token = requests.post(
      'https://openapi.vito.ai/v1/authenticate',
      data={'client_id': os.environ.get('stt_id'),
            'client_secret': os.environ.get('stt_secret')}
  )
  token.raise_for_status()
  token_json = token.json()
  return token_json['access_token']


def getScripts(token, audio_path):
  # 음성 파일 분석 요청
  config = {
    "diarization": {
      "use_verification": False
    },
    "use_multi_channel": False,
    "paragraph_splitter": {
        "min": 1,
        "max": 10
    }
  }
  response = requests.post(
      'https://openapi.vito.ai/v1/transcribe',
      headers={'Authorization': 'bearer '+ token},
      data={'config': json.dumps(config)},
      files={
        'file': open(audio_path, 'rb')
      }
  )
  response.raise_for_status()
  response_json = response.json()
  stt_id = response_json['id']

  # 분석 완료 내용 불러오기
  while True:
    resp = requests.get(
      'https://openapi.vito.ai/v1/transcribe/' + stt_id,
      headers={'Authorization': 'bearer ' + token},
    )
    resp.raise_for_status()
    resp_json = resp.json()
    if(resp_json['status'] == 'completed'):
      result = resp_json['results']['utterances']
      break
    time.sleep(1)
  print(result)
  return result