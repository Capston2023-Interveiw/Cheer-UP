from flask import Flask, render_template, url_for
from flask import request
from flask import Response
from flask import stream_with_context
import time
import cv2
from Camera import Camera

app = Flask( __name__ )
app.config['JSON_AS_ASCII'] = False
isProgress = False
isStream = False
result = None
camera = Camera()
@app.route('/progress')
def home():
    return render_template('video.html')

@app.route('/stream')
def stream():
    src = request.args.get('src', default = 0, type = int)
    global isStream 
    global result
    result = None
    isStream = True
    try:
        return Response(
                            stream_with_context( stream_gen(src) ),
                            mimetype='multipart/x-mixed-replace; boundary=frame' 
                        )    
    except Exception as e :
        print('stream error : ',str(e))

def stream_gen(src):
    try:
        camera.run(src)
        while isStream:
            frame = camera.bytescode()
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        camera.stop()
    except GeneratorExit:
        camera.stop()

@app.route('/end')
def end():
    global isStream
    isStream = False
    result = camera.model.result()
    time.sleep(5)
    return render_template('result.html', data={"result": result})


################################################################

cam = cv2.VideoCapture(0)  # use 0 for web camera
cam.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cam.set(cv2.CAP_PROP_FRAME_HEIGHT, 360)
def gen_frames():  # generate frame by frame from camera
    while True:
        # Capture frame-by-frame
        success, frame = cam.read()  # read the camera frame
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result


@app.route('/video_feed')
def video_feed():
    #Video streaming route. Put this in the src attribute of an img tag
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/')
def index():
    """Video streaming home page."""
    return render_template('start.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8888, debug=True)