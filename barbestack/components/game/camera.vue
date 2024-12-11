<template>
  <div>
    <div class="video-wrapper">
      <video ref="videoElement" class="camera-disp" autoplay playsinline></video>
      <canvas ref="canvasElement" style="display: none;"></canvas>
      <ToggleSwitch class="toggle-switch" :value="isLightOn" @update:value="toggleLight" />
      <ShutterButton class="shutter-button" @click="handleDetectQRCode" />
    </div>
    <div>
      <button @click="startCamera">カメラを起動</button>
      <button @click="stopCamera" :disabled="!isCameraActive">カメラを停止</button>
    </div>
    <p v-if="qrCodeData.length > 0">検出されたQRコード: {{ qrCodeData.join(', ') }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { ref, onUnmounted } from 'vue';
import { detectQRCode } from '~/scripts/game/barcode';
import ToggleSwitch from '~/components/atoms/ToggleSwitch.vue';

export default {
  name: 'Camera',
  components: { ToggleSwitch },
  emits: ['qrCodeDetected'],
  setup(_, { emit }) {
    const videoElement = ref<HTMLVideoElement | null>(null);
    const canvasElement = ref<HTMLCanvasElement | null>(null);
    const stream = ref<MediaStream | null>(null);
    const errorMessage = ref<string | null>(null);
    const isCameraActive = ref(false);
    const qrCodeData = ref<string[]>([]);
    const isLightOn = ref(false);

    const startCamera = async () => {
      errorMessage.value = null;
      if (!videoElement.value) return;

      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        stream.value = mediaStream;
        videoElement.value.srcObject = mediaStream;
        isCameraActive.value = true;
      } catch (err) {
        handleError('カメラの起動に失敗しました', err);
      }
    };

    const stopCamera = () => {
      if (stream.value) {
        stream.value.getTracks().forEach((track) => track.stop());
        stream.value = null;
        isCameraActive.value = false;
      }
    };

    const toggleLight = async (value: boolean) => {
      if (!stream.value) {
        handleError('カメラが起動していません。');
        return;
      }

      try {
        const videoTrack = stream.value.getVideoTracks()[0];
        const capabilities = videoTrack.getCapabilities();

        if ('torch' in capabilities) {
          await videoTrack.applyConstraints({ advanced: [{ torch: value }] });
          isLightOn.value = value;
        } else {
          handleError('このデバイスはライト制御をサポートしていません。');
        }
      } catch (err) {
        handleError('ライトの切り替えに失敗しました。', err);
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
          // フィルタリング処理
          const validCodes = codes.filter((code) => {
            console.log('QRコード:', code); // デバッグ用
            return code.includes('barbestack/');
          });

          if (validCodes.length > 0) {
            emit('qrCodeDetected', validCodes);
            errorMessage.value = 'QRコードが正常に検出されました。';
          } else {
            errorMessage.value = 'QRコードに "barbestack/" が含まれていません。';
          }
        } else {
          errorMessage.value = 'QRコードが見つかりませんでした。';
        }
      } catch (err) {
        handleError('QRコードの検出中にエラーが発生しました。', err);
      }
    };


    const handleError = (message: string, error?: any) => {
      errorMessage.value = message;
      if (error) console.error(message, error);
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
      isLightOn,
      toggleLight,
    };
  },
};
</script>


<style scoped>
.video-wrapper {
  position: relative;
}

.toggle-switch {
  position: absolute;
  bottom: 100px;
  left: 100px;
}

.shutter-button {
  position: absolute;
  bottom: 100px;
  left: 250px;
}

.camera-disp {
  width: 100vh;
  height: 60vh;
  object-fit: cover;
  /* カメラ映像が画面いっぱいに表示されるように調整 */
  background-color: black;
}

button {
  margin: 10px;
}
</style>
