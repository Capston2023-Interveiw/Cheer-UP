from flask import Flask
from flask import request
from flask import Response
from flask import stream_with_context
import time
from Camera import Camera

app = Flask( __name__ )
app.config['JSON_AS_ASCII'] = False
isProgress = False
isStream = False
camera = Camera()

@app.route('/stream')
def stream():
    src = request.args.get('src', default = 0, type = int)
    global isStream 
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
    except GeneratorExit:
        camera.stop()

@app.route('/end')
def end():
    global isStream 
    isStream = False
    camera.stop()
    time.sleep(1)
    return camera.result()
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8888, debug=True)