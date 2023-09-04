from collections import Counter
from konlpy.tag import Okt
from wordcloud import WordCloud
from connection.connection import putImageToS3
import matplotlib.pyplot as plt
import os
import uuid

from collections import Counter
from konlpy.tag import Okt
from wordcloud import WordCloud
from connection.connection import putImageToS3
import matplotlib.pyplot as plt
import os
import uuid

def createWordCloud(text):
    # 변환된 텍스트를 기반으로 워드 클라우드 생성
    okt = Okt()
    nouns = okt.nouns(text)
    print("인식된 텍스트:", text)
    words = [n for n in nouns if len(n) > 1]
    c = Counter(words)

    # 워드 클라우드 생성하기
    font_path = os.path.abspath("./NotoSansKR-Medium.ttf")
    wc = WordCloud(font_path=font_path, width=400, height=400, scale=2.0, max_font_size=100)
    gen = wc.generate_from_frequencies(c)

    fname = (f"{str(uuid.uuid4())}.png")
    key = f"{os.environ.get('DOMAIN_NAME')}/{fname}"
    # 워드 클라우드 이미지 저장하기

    wc.to_file(f"./video/{fname}")

    file = open(f"./video/{fname}", 'rb')
    putImageToS3(fname, file, 1)
    file.close()
    return key