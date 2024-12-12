<template>
    <div class="game">
        <div>
            <Camera ref="camera" @qrCodeDetected="handleQRCode" />
            <p v-if="scannedCode">スキャンしたQRコード: {{ scannedCode }}</p>
        </div>
        <Maps class="maps" v-show="isView" />
        <img src="~/assets/images/target.png" alt="target" class="target" />
        <div class="under-buttons-area">
            <UnderBalckBackground class="under-black-background" />
            <div class="under-buttons">
                <button class="view-button" @click="changeView">
                    <img src="~/assets/images/ViewButton.png" alt="button" />
                </button>
                <ShutterButton @click="triggerCameraScan" />
                <button class="flash-button">
                    <img src="~/assets/images/FlashButton.png" alt="button" />
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import UnderBalckBackground from '~/components/game/UnderBalckBackground.vue';
import { ref } from 'vue';

export default {
    name: 'Index',
    setup() {
        const scannedCode = ref<string | null>(null);
        const camera = ref(null); // Camera コンポーネントへの参照
        const isView = ref(true);

        const handleQRCode = (code: string) => {
            scannedCode.value = code; // QRコードの内容を保存
        };

        const triggerCameraScan = () => {
            (camera.value as any)?.flashDetectQRCode();
        };

        const changeView = () => {
            isView.value = !isView.value;
        };

        return {
            scannedCode,
            handleQRCode,
            triggerCameraScan,
            changeView,
            isView,
            camera,
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

.target {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    width: 80vw;
    height: auto;
    z-index: 1;
}

.under-buttons-area {
    position: absolute;
    bottom: 110px;
    left: 0;
    width: 100%;
    height: 100px;
}

.under-buttons {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}

.view-button {
    transform: translateX(0px) translateY(1px);
    width: 50px;
    margin: auto;
}

.flash-button {
    transform: translateX(-10px);
    width: 50px;
    margin: auto;
}
</style>