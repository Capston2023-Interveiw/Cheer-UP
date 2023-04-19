from flask import Flask, render_template, url_for
from flask import request
from flask import Response
from flask import stream_with_context

from Camera import Camera

app = Flask( __name__ )
app.config['JSON_AS_ASCII'] = False
camera = Camera()
isProgress = False
@app.route('/')
def home():
    return render_template('video.html')

@app.route('/stream')
def stream():
    src = request.args.get( 'src', default = 0, type = int )
    global isProgress
    isProgress = True
    try:
        return Response(
                                stream_with_context( stream_gen(src) ),
                                mimetype='multipart/x-mixed-replace; boundary=frame' )    
    except Exception as e :
        print('stream error : ',str(e))

def stream_gen(src):   
    try:   
        camera.run(src)
        while isProgress:
            frame = camera.bytescode()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        camera.stop()
    except GeneratorExit:
        camera.stop()

@app.route('/end')
def end():
    global isProgress 
    isProgress = False
    return camera.result()
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8888, debug=True)