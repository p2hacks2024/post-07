<template>
  <div>
    <div class="video-wrapper">
      <video ref="videoElement" class="camera-disp" autoplay playsinline></video>
      <canvas ref="canvasElement" style="display: none;"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onUnmounted } from 'vue';
import { detectQRCode } from '~/scripts/game/barcode';

export default {
  name: 'Camera',
  setup() {
    const videoElement = ref<HTMLVideoElement | null>(null);
    const canvasElement = ref<HTMLCanvasElement | null>(null);
    const stream = ref<MediaStream | null>(null);
    const errorMessage = ref<string | null>(null);
    const isCameraActive = ref(false);
    const qrCodeData = ref<string[]>([]);
    const lightType = ref(0);


    const startCamera = async () => {
      errorMessage.value = null;

      if (!videoElement.value) return;

      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            advanced: [{ focusMode: 'continuous' }] as any,
          },
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

    const changeLightType = async (value: number) => {
      lightType.value = value; // フラッシュモードを切り替えるだけ

      if (!stream.value) {
        handleError('カメラが起動していません。');
        return;
      }

      const videoTrack = stream.value.getVideoTracks()[0];
      const capabilities = videoTrack.getCapabilities();

      if ('torch' in capabilities) {
        try {
          if (lightType.value == 2) {
            // フラッシュモードが有効な場合のみライトをオン
            await videoTrack.applyConstraints({
              advanced: [{ torch: true }] as any,
            });
          }
          else {
            // フラッシュモードが有効な場合ライトをオフ
            await videoTrack.applyConstraints({
              advanced: [{ torch: false }] as any,
            });
          }
        } catch (err) {
          handleError('フラッシュの変更に失敗しました。', err);
        }
      } else {
        handleError('このデバイスはライト制御をサポートしていません。');
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
            return validCodes;
          }
        }
      } catch (err) {
        handleError('QRコードの検出中にエラーが発生しました。', err);
      }
      return null;
    };

    const shutterDetectQRCode = async () => {

      if (!stream.value) {
        handleError('カメラが起動していません。');
        return null;
      }

      const videoTrack = stream.value.getVideoTracks()[0];
      const capabilities = videoTrack.getCapabilities();

      if ('torch' in capabilities) {
        try {
          // 自動フラッシュモード
          if (lightType.value == 1) {
            // フラッシュモードが有効な場合のみライトをオン
            await videoTrack.applyConstraints({
              advanced: [{ torch: true }] as any,
            });

            // 2秒間待機（ピント調整時間）
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }

          // QRコードを検知
          const codeValue = await handleDetectQRCode();

          if (lightType.value != 2) {
            // フラッシュモードが有効な場合ライトをオフ
            await videoTrack.applyConstraints({
              advanced: [{ torch: false }] as any,
            });
          }

          return codeValue;
        } catch (err) {
          handleError('フラッシュ撮影に失敗しました。', err);
          return null;
        }
      } else {
        handleError('このデバイスはライト制御をサポートしていません。');
        return null;
      }
    };

    const handleError = (message: string, error?: any) => {
      errorMessage.value = message;
      if (error) console.error(message, error);
    };

    const getIsCameraActive = (): boolean => {
      return isCameraActive.value;
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
      shutterDetectQRCode,
      errorMessage,
      qrCodeData,
      isCameraActive,
      changeLightType,
      getIsCameraActive,
    };
  },
};
</script>


<style scoped>
.video-wrapper {
  position: relative;
  width: 100%;
  height: 100svh;
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
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* カメラ映像が画面いっぱいに表示されるように調整 */
  background-color: black;
}

button {
  margin: 10px;
}
</style>
