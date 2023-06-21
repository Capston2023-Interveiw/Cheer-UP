from flask import Flask, render_template, url_for
from flask import request
from flask import Response
from flask import stream_with_context
from dotenv import load_dotenv
import cv2
import uuid
import os
import json
from Camera import Camera
import time
from CombineVideoAndAudio import combineVideo
from DataDao import DataDao

app = Flask( __name__ )
app.config['JSON_AS_ASCII'] = False
isStream = False
database = DataDao()
camera = None
fname = ""
load_dotenv()


@app.route('/interview/progress')
def home():
    return render_template('video.html')

@app.route('/progress')
def progress():
    global isStream
    global camera
    global fname

    src = request.args.get('src', default = 0, type = int)
    fname = (str(uuid.uuid4()))
    key = f"{os.environ.get('DOMAIN_NAME')}/{fname}"
    database.insertVideo(key, 1)
    video_id = database.selectVideo(1)
    camera = Camera(video_id)
    isStream = True
    try:
        return Response(
                            stream_with_context( stream_gen(src) ),
                            mimetype='multipart/x-mixed-replace; boundary=frame' 
                        )    
    except Exception as e :
        print('stream error : ',str(e))

def stream_gen(src):
    global camera
    try:
        camera.run(src)
        while isStream:
            frame = camera.bytescode()
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    except GeneratorExit:
        camera.stop()

@app.route('/interview/end')
def end():
    global isStream
    global camera
    isStream = False
    camera.started = False
    camera.detection.result()
    del(camera)
    combineVideo(fname)

    return json.dumps({"video_id": database.selectVideo(1)})

# cam = cv2.VideoCapture(0)
# cam.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
# cam.set(cv2.CAP_PROP_FRAME_HEIGHT, 360)

# @app.route('/video_feed')
# def video_feed():
#     return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# def gen_frames(): 
#     while True:
#         success, frame = cam.read()
#         if not success:
#             break
#         else:
#             ret, buffer = cv2.imencode('.jpg', frame)
#             frame = buffer.tobytes()
#             yield (b'--frame\r\n'
#                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result

# @app.route('/')
# def index():
#     return render_template('start.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8888, debug=True)