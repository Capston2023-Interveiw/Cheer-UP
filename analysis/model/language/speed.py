import wave

# 음성 파일의 길이를 확인한다.
def get_duration(audio_path):
    audio = wave.open(audio_path)
    frames = audio.getnframes()
    rate = audio.getframerate()
    duration = frames / float(rate)
    return duration

def scripts_length(scripts):
    return len(scripts.replace(" ",""))

def speaking_speed(time, script_length):
    speed = script_length / time * 60
    if speed >= 346:
        return 17, 10
    elif 336 <= speed <= 345:
        return 18, 15
    elif 276 <= speed <= 335:
        return 19, 20
    elif 236 <= speed <= 275:
        return 20, 15
    else:
        return 21, 10