import urllib3
import json
from dotenv import load_dotenv
import os 

load_dotenv()

def check_sentence(scripts):
    openApiURL = "http://aiopen.etri.re.kr:8000/WiseNLU_spoken"

    accessKey = os.environ.get('etri_id')

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
    morphemes = response_json['return_object']['sentence'][0]['morp']
    interjection_list = list()
    count = 0
    for index in range(len(morphemes)):
        if morphemes[index]['type'] == "IC" and morphemes[index]['weight'] > 0.055:
            if len(interjection_list) > 0 and morphemes[index]['position'] - morphemes[count]['position'] == 4:
                prev = interjection_list.pop()
                additionalContent = f'{prev} {morphemes[index]["lemma"]}'
                interjection_list.append(additionalContent)
            else:
                interjection_list.append(morphemes[index]['lemma'])
            count = index
        
    return interjection_list