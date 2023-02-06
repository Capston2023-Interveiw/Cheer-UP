import urllib3
import json
from dotenv import load_dotenv
import os 

load_dotenv()


def check_sentence(scripts):
    openApiURL = "http://aiopen.etri.re.kr:8000/WiseNLU_spoken"

    accessKey = os.environ.get('etri_id')
    interjection_list = list()

    requestJson = {  
        "argument": {
            "text": scripts,
            "analysis_code": "morp"
        }
    }
        
    http = urllib3.PoolManager()
    response = http.request(
        "POST",
        openApiURL,
        headers={"Content-Type": "application/json; charset=UTF-8", "Authorization" :  accessKey},
        body=json.dumps(requestJson)
    )

    response = response.data
    response_json = json.loads(response.decode('utf-8'))
    for i in response_json['return_object']['sentence'][0]['morp']:
        if i['type'] == "IC":
            interjection_list.append(i['lemma'])

    for i in interjection_list:
        print(i)