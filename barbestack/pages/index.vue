<template>
    <div>
      <h1>QRコードリーダー</h1>
      <Camera @qrCodeDetected="handleQRCode" />
      <p v-if="scannedCode">スキャンしたQRコード: {{ scannedCode }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import Camera from '../components/game/camera.vue'; // camera.vueをインポート
  
  export default {
    name: 'Index',
    components: {
      Camera,
    },
    setup() {
      const scannedCode = ref<string | null>(null);
  
      const handleQRCode = (code: string) => {
        scannedCode.value = code; // QRコードの内容を保存
      };
  
      return {
        scannedCode,
        handleQRCode,
      };
    },
  };
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
    margin: 20px 0;
  }
  </style>
  