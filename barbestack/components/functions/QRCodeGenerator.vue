<script setup>
import { ref } from 'vue';
import VueQrcode from "@chenfengyuan/vue-qrcode";

// Define props for the component
const props = defineProps({
    msg: String
})

// Define a reactive variable to hold the text for the QR code
const generateText = ref("");

const generate = () => {
    generateText.value = props.msg || null;
}

onMounted(() => {
    generate();
});
</script>

<template>
    <div>
        <vue-qrcode v-if="generateText" :value="generateText" tag="img"></vue-qrcode>
    </div>
</template>
