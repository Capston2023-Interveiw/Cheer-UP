// HTML Body에 아래와 같은 id가 video-output인 비디오 태그를 포함.
// <video id="video-output"></video>

const videoOutput = document.getElementById("video-output");
const constraints = { audio: false, video: true };

navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
    // MediaStream을 HTMLVideoElement의 srouce로 설정
    videoOutput.srcObject = mediaStream;
    // metadata가 로드될 때 실행되는 이벤트
    videoOutput.onloadedmetadata = function () {
        // HTMLVideoElement로 카메라의 화면을 출력하기 시작
        videoOutput.play();
    };
});
