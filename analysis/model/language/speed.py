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
    if speed > 376:
        return "매우 빠른 속도", 10
    elif 356 < speed < 375:
        return "조금 빠른 속도", 15
    elif 336 < speed < 355:
        return "적당한 속도", 20
    elif 316 < speed <335:
        return "조금 느린 속도", 15
    else:
        return "매우 느린 속도", 10