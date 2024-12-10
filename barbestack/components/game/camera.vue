<template>
  <div>
    <video ref="videoElement" autoplay playsinline></video>
    <canvas ref="canvasElement" style="display: none;"></canvas>
    <div>
      <button @click="startCamera">カメラを起動</button>
      <button @click="stopCamera" :disabled="!isCameraActive">カメラを停止</button>
      <button @click="handleDetectQRCode" :disabled="!isCameraActive">QRコードを検出</button>
    </div>
    <p v-if="qrCodeData.length > 0">検出されたQRコード: {{ qrCodeData.join(', ') }}</p>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { ref, onUnmounted } from 'vue';
import { detectQRCode } from '~/scripts/game/barcode'; // barcode.js をインポート

export default {
  name: 'Camera',
  emits: ['qrCodeDetected'],
  setup(_, { emit }) {
    const videoElement = ref<HTMLVideoElement | null>(null);
    const canvasElement = ref<HTMLCanvasElement | null>(null);
    const stream = ref<MediaStream | null>(null);
    const errorMessage = ref<string | null>(null);
    const isCameraActive = ref(false);
    const qrCodeData = ref<string[]>([]);

    const startCamera = async () => {
      errorMessage.value = null;
      if (!videoElement.value) return;

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

    const handleDetectQRCode = async () => {
  if (!canvasElement.value || !videoElement.value) return;

  const canvas = canvasElement.value;
  const context = canvas.getContext('2d');
  if (!context) return;

  canvas.width = videoElement.value.videoWidth;
  canvas.height = videoElement.value.videoHeight;
  context.drawImage(videoElement.value, 0, 0, canvas.width, canvas.height);

  try {
    const codes = await detectQRCode(canvas);
    qrCodeData.value = codes;

    if (codes.length > 0) {
      // berbestack/ が含まれているか判定
      const validCodes = codes.filter((code) => code.includes('berbestack/'));

      if (validCodes.length > 0) {
        emit('qrCodeDetected', validCodes);
        errorMessage.value = 'OK'; // 成功メッセージを設定
      } else {
        errorMessage.value = 'QRコードに "berbestack/" が含まれていません。';
      }
    } else {
      errorMessage.value = 'QRコードが見つかりませんでした。';
    }
  } catch (e: any) {
    errorMessage.value = e.message;
  }
};

    onUnmounted(() => {
      stopCamera();
    });

    return {
      videoElement,
      canvasElement,
      startCamera,
      stopCamera,
      handleDetectQRCode,
      errorMessage,
      qrCodeData,
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
