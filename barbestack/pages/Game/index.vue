<template>
    <div class="game">
        <div>
            <Camera @qrCodeDetected="handleQRCode" />
            <p v-if="scannedCode">スキャンしたQRコード: {{ scannedCode }}</p>
        </div>
        <Maps class="maps" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'Index',
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
.game {
    position: relative;
}

.maps {
    position: absolute;
    border: solid 5px #F0F;
    top: 20px;
    left: 20px;
    width: 360px;
    height: 360px;
    transform: scale(0.4) translateX(-80%) translateY(-80%);
}
</style>