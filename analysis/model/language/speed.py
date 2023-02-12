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
    speed = script_length / time
    if speed > 5.5:
        return "빠른 속도"
    elif speed < 4.5:
        return "느린 속도"
    return "적당한 속도"

