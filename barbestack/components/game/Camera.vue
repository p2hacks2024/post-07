<template>
    <div>
        <video ref="videoElement" autoplay playsinline></video>
        <div>
            <button @click="startCamera">カメラを起動</button>
            <button @click="stopCamera" :disabled="!isCameraActive">カメラを停止</button>
        </div>
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

export default {
    name: 'CameraComponent',
    setup() {
        const videoElement = ref<HTMLVideoElement | null>(null);
        const stream = ref<MediaStream | null>(null);
        const errorMessage = ref<string | null>(null);
        const isCameraActive = ref(false);

        const startCamera = async () => {
            errorMessage.value = null; // エラーメッセージをクリア
            if (!videoElement.value) return;

            // `navigator.mediaDevices.getUserMedia`が利用可能か確認
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                errorMessage.value = 'このブラウザはカメラの起動をサポートしていません。';
                return;
            }

            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' },
                });
                stream.value = mediaStream;
                videoElement.value.srcObject = mediaStream;
                isCameraActive.value = true;
            } catch (err) {
                errorMessage.value = `カメラの起動に失敗しました: ${err}`;
                console.error(err);
            }
        };

        const stopCamera = () => {
            if (stream.value) {
                stream.value.getTracks().forEach((track) => track.stop());
                stream.value = null;
                isCameraActive.value = false;
            }
        };

        onUnmounted(() => {
            stopCamera();
        });

        return {
            videoElement,
            startCamera,
            stopCamera,
            errorMessage,
            isCameraActive,
        };
    },
};
</script>

<style scoped>
video {
    width: 100%;
    height: auto;
    background-color: black;
}

button {
    margin: 10px;
}
</style>