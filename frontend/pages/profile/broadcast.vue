<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import NavbarComponent from '~/components/NavbarComponent.vue';
import Footer from '~/components/Footer.vue';
import { useUserStore } from '#imports';
import { useAPI } from '#imports';

const api = useAPI();

interface FormData {
    name: string;
    description: string;
    fileImage: File | null;
    file: File | null;
    creatorId: string | null;
    date: string;
    [key: string]: any;
}


const formData = ref<FormData>({
    name: 'podcats',
    description: 'gshfhijezjfijeizfi',
    fileImage: null,
    file: null,
    creatorId: '',
    date: new Date().toLocaleDateString('Fr-fr'),
});

export default defineComponent({


    components: {
        NavbarComponent,
        Footer,
    },
    setup() {
        const ws = new WebSocket('ws://localhost:8080');
        let mediaRecorder: any;
        let recordedChunks: any[] = [];
        let audioContext;
        let microphoneSource;
        let desktopSource;
        let gainNode: any;

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
                mediaRecorder.ondataavailable = (event: any) => {
                    if (event.data.size > 0) {
                        recordedChunks.push(event.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    const blob = new Blob(recordedChunks, { type: 'audio/webm' });
                    const file = new File([blob], 'broadcast.webm', { type: 'audio/webm' });

                    formData.value.fileImage = new File([new Blob()], 'image.png', { type: 'image/png' });
                    formData.value.file = file;
                    formData.value.creatorId = useUserStore().user_id;
                    const formDataToSend = new FormData();
                    for (const key in formData.value) {
                        formDataToSend.append(key, formData.value[key]);
                    }
                    api.post(`/podcasts`, formDataToSend, {
                        headers: {
                            'Authorization': `Bearer ${useUserStore().user_token}`,
                            'Content-Type': 'multipart/form-data'
                        },
                    });
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
    <NavbarComponent />
    <div class="m-10 gap-5 flex flex-col">
        <h1 class="text-6xl font-bold text-primary">Poste de diffusion</h1>

        <h2 class="text-4xl text-primary">Broadcasting</h2>
        <div class="flex gap-8">
            <button
                class="rounded-lg font-bungee bg-white border-4 border-primary px-4 py-2 text-primary text-nowrap hover:bg-primary hover:text-white hover:border-white transition-all"
                id="start">Start</button>
            <button
                class="rounded-lg font-bungee bg-white border-4 border-primary px-4 py-2 text-primary text-nowrap hover:bg-primary hover:text-white hover:border-white transition-all"
                id="stop">Stop</button>
        </div>

        <h2 class="text-4xl text-primary">Table de Mixage</h2>
        <div class="border-4 border-dashed border-primary p-4 py-20 text-center rounded-lg text-primary" id="drop-zone">
            Déposez vos fichiers audio ici</div>

        <div class="controls flex flex-col gap-4">
            <div class="flex gap-8">
                <button
                    class="rounded-lg font-bungee bg-white border-4 border-primary px-4 py-2 text-primary text-nowrap hover:bg-primary hover:text-white hover:border-white transition-all"
                    id="play-audio">Lire l'audio</button>
                <button
                    class="rounded-lg font-bungee bg-white border-4 border-primary px-4 py-2 text-primary text-nowrap hover:bg-primary hover:text-white hover:border-white transition-all"
                    id="stop-audio">Arrêter l'audio</button>
            </div>
            <div class="flex flex-col gap-2">
                <h3 for="micro-volume" class="text-primary">Volume Micro:</h3>
                <input type="range" id="micro-volume" min="0" max="100" value="50" class="w-full accent-primary">
            </div>
            <div class="flex flex-col gap-2">
                <h3 for="desktop-volume" class="text-primary">Volume Bureau:</h3>
                <input type="range" id="desktop-volume" min="0" max="100" value="50" class="w-full accent-primary">
            </div>
        </div>

        <audio id="audio-player" controls></audio>
    </div>
    <Footer />
</template>

<style scoped>
audio {
    width: 100%;
    accent-color: #FB0101;
    border-radius: 10px;
}

audio::-webkit-media-controls-panel {
    background-color: #FB0101;
}

audio::-webkit-media-controls-time-current-display {
    color: #fff;
}

audio::-webkit-media-controls-time-remaining-display {
    color: #fff;
}

audio::-webkit-media-controls-mute-button {
    background-color: #fff;
    border-radius: 50%;
}

audio:-webkit-media-controls-play-button {
    background-color: #fff;
    border-radius: 50%;
}
</style>
