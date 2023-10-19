let mediaRecorder;
let audioChunks = [];
let isRecording = false;

async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
        // 在录音停止后，我们并不需要在这里执行任何操作
    };

    mediaRecorder.start();
}

function stopRecording() {
    if (mediaRecorder) {
        mediaRecorder.stop();
    }
}

function toggleRecording() {
    if (isRecording) {
        stopRecording();
        isRecording = false;
    } else {
        startRecording();
        isRecording = true;
    }
}

function playRecordedAudio() {
    if (!audioChunks.length) {
        alert("请先录音!");
        return;
    }

    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = audioUrl;
    audioPlayer.play();
}
