from flask import Flask
from flask import request
from flask import Response
from flask import stream_with_context

from Camera import Streamer

app = Flask( __name__ )
streamer = Streamer()
isProgress = False

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
        streamer.run(src)
        while isProgress:
            frame = streamer.bytescode()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        streamer.stop()
    except GeneratorExit:
        streamer.stop()

@app.route('/end')
def end():
    global isProgress 
    isProgress = False
    return "Hi"
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8888, debug=True)