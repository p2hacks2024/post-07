<template>
  <video ref="video" autoplay></video>
</template>

<script setup>
import { ref } from 'vue';
import { useUserMedia } from '@vueuse/core';

const video = ref(null);

const { start, stop } = useUserMedia({
  audio: false,
  video: {
    facingMode: { exact: 'environment' } // Request rear camera by default
  }
});

start().then(stream => {
  video.value.srcObject = stream;
  video.value.onloadedmetadata = () => {
    video.value.play();
  };
}).catch(error => {
  console.error('Error accessing camera:', error);
  // Optionally display a user-friendly error message or retry logic
});
</script>