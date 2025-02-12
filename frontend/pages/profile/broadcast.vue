<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';

export default defineComponent({
    components: {
        Navbar,
        Footer,
    },
    setup() {
        const ws = new WebSocket('ws://localhost:8080');
        let mediaRecorder;
        let recordedChunks = [];
        let audioContext;
        let microphoneSource;
        let desktopSource;
        let gainNode;

        ws.onopen = () => {
            ws.send(JSON.stringify({ type: 'broadcast' }));
            console.log("Connected to WebSocket server as broadcaster");
        };

        const startBroadcasting = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                audioContext = new AudioContext();
                microphoneSource = audioContext.createMediaStreamSource(stream);
                desktopSource = audioContext.createMediaElementSource(document.getElementById('audio-player'));
                gainNode = audioContext.createGain();
                const mixedOutput = audioContext.createMediaStreamDestination();
                microphoneSource.connect(gainNode);
                desktopSource.connect(gainNode);
                gainNode.connect(mixedOutput);
                mixedOutput.stream.getAudioTracks().forEach(track => stream.addTrack(track));
                gainNode.connect(audioContext.destination);

                const processor = audioContext.createScriptProcessor(8192, 1, 1);
                gainNode.connect(processor);
                processor.connect(audioContext.destination);

                processor.onaudioprocess = (event) => {
                    const audioData = Array.from(event.inputBuffer.getChannelData(0));
                    ws.send(JSON.stringify({ type: 'audio', audio: audioData }));
                };

                mediaRecorder = new MediaRecorder(mixedOutput.stream, { mimeType: 'audio/webm' });
                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        recordedChunks.push(event.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    const blob = new Blob(recordedChunks, { type: 'audio/webm' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = 'broadcast.webm';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    recordedChunks = [];
                };

                mediaRecorder.start();
                console.log("Microphone access granted and broadcasting started.");
            } catch (error) {
                console.error("Error accessing microphone:", error);
            }
        };

        const stopBroadcasting = () => {
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
                ws.send(JSON.stringify({ type: 'stopBroadcast' }));
                ws.close();
                console.log("Stopped broadcasting and WebSocket connection closed.");
            }
        };

        onMounted(() => {
            document.getElementById('start').onclick = startBroadcasting;
            document.getElementById('stop').onclick = stopBroadcasting;

            const dropZone = document.getElementById('drop-zone');
            const audioPlayer = document.getElementById('audio-player');
            const playButton = document.getElementById('play-audio');
            const stopButton = document.getElementById('stop-audio');
            const microVolume = document.getElementById('micro-volume');
            const desktopVolume = document.getElementById('desktop-volume');

            dropZone.addEventListener('dragover', (event) => {
                event.preventDefault();
                dropZone.style.borderColor = 'green';
            });

            dropZone.addEventListener('dragleave', () => {
                dropZone.style.borderColor = '#ccc';
            });

            dropZone.addEventListener('drop', (event) => {
                event.preventDefault();
                dropZone.style.borderColor = '#ccc';
                const files = event.dataTransfer.files;
                if (files.length > 0) {
                    const file = files[0];
                    const url = URL.createObjectURL(file);
                    audioPlayer.src = url;
                }
            });

            playButton.addEventListener('click', () => {
                audioPlayer.play();
            });

            stopButton.addEventListener('click', () => {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            });

            microVolume.addEventListener('input', (event) => {
                const volume = event.target.value / 100;
                gainNode.gain.value = volume;
                console.log('Volume Micro:', volume);
            });

            desktopVolume.addEventListener('input', (event) => {
                const volume = event.target.value / 100;
                audioPlayer.volume = volume;
                console.log('Volume Bureau:', volume);
            });
        });

        return {};
    },
});
</script>

<template>
    <Navbar/>

    <h1>Broadcasting</h1>
    <button id="start">Start Broadcasting</button>
    <button id="stop">Stop Broadcasting</button>

    <h1>Table de Mixage</h1>
    <div class="drop-zone" id="drop-zone">Déposez vos fichiers audio ici</div>
    <div class="controls">
        <button id="play-audio">Lire l'audio</button>
        <button id="stop-audio">Arrêter l'audio</button>
        <label for="micro-volume">Volume Micro:</label>
        <input type="range" id="micro-volume" min="0" max="100" value="50">
        <label for="desktop-volume">Volume Bureau:</label>
        <input type="range" id="desktop-volume" min="0" max="100" value="50">
    </div>
    <audio id="audio-player" controls></audio>

    <Footer/>
</template>

<style scoped>
.drop-zone {
    width: 300px;
    height: 100px;
    border: 2px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}
.controls {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>