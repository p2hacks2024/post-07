<template>
    <div>
        <div class="game">
            <div>
                <Camera ref="camera" @qrCodeDetected="handleQRCode" />
            </div>
            <div class="info-area">
                <div class="maps-wrapper" v-show="isView" @click="changeMapMode">
                    <Maps ref="maps" class="maps" />
                </div>
                <KillLogList ref="killLogRef" class="killlog" v-show="isView" />
            </div>
            <img src="~/assets/images/target.png" alt="target" class="target" />
            <div class="under-buttons-area">
                <UnderBalckBackground class="under-black-background" />
                <div class="under-buttons">
                    <button class="view-button" @click="changeView">
                        <img src="~/assets/images/ViewButton.png" :class='isView ? "view" : "isView"' alt="button" />
                    </button>
                    <ShutterButton @click="triggerCameraScan" />
                    <button class="flash-button" @click="changeFlash">
                        <img src="~/assets/images/FlashButton.png" :class="flashPattern" alt="button" />
                    </button>
                </div>
            </div>
        </div>

        <div class="debug-buttons">
            <div>
                <button @click="startCamera">カメラを起動</button>
                <button @click="stopCamera" :disabled="!(isCameraActive)">カメラを停止</button>
            </div>
            <p v-if="scannedCode">スキャンしたQRコード: {{ scannedCode }}</p>
            <button @click="addKillLog('aaaaaaaaaaaaa', 'bbbbbbbbbbbbb')">add killlog</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const scannedCode = ref<string | null>(null);
const camera = ref<any>(null); // Camera コンポーネントへの参照
const killLogRef = ref<{ addKillLog: (killer: string, victim: string) => void } | null>(null);
const maps = ref<any>(null); // Maps コンポーネントへの参照
const isView = ref(true);
const flashPatterns = ['flash-off', 'flash-auto', 'flash-on'];
const flashPatternNum = ref(0);
const flashPattern = ref("");

const startCamera = () => {
    if (camera.value) {
        camera.value?.startCamera();
    } else {
        console.error("Camera ref is not set.");
    }
};

const stopCamera = () => {
    if (camera.value) {
        camera.value?.stopCamera();
    } else {
        console.error("Camera ref is not set.");
    }
};

const isCameraActive = (): boolean => {
    if (camera.value) {
        return camera.value?.getIsCameraActive;
    } else {
        return false;
    }
};

const handleQRCode = (code: string) => {
    scannedCode.value = code; // QRコードの内容を保存
};

const triggerCameraScan = async () => {
    if (camera.value) {
        const qrCodeValue = await camera.value.shutterDetectQRCode()

        scannedCode.value = qrCodeValue ? qrCodeValue : null;

    } else {
        console.error("Camera ref is not set.");
    }
};

const changeView = () => {
    isView.value = !isView.value;
};

const changeFlash = () => {
    flashPatternNum.value = (flashPatternNum.value + 1) % flashPatterns.length;
    if (camera.value) {
        camera.value.changeLightType(flashPatternNum.value);
    } else {
        console.error("Camera ref is not set.");
    }
    flashPattern.value = flashPatterns[flashPatternNum.value] || "flash-off";
};


const addKillLog = (killer: string, victim: string) => {
    if (killLogRef.value) {
        killLogRef.value.addKillLog(killer, victim);
    } else {
        console.error("killLogRef is not set.");
    }
    maps.value?.plotLocations([{ lat: 41.84162548819161, lng: 140.76630721848127 }]);
};

const changeMapMode = () => {
    if (maps.value) {
        maps.value?.changeViewMode();
    } else {
        console.error("Maps ref is not set.");
    }
};

</script>

<style scoped>
.game {
    position: relative;
    width: 100%;
    height: 100svh;
    overflow: hidden;
}

.info-area {
    position: absolute;
    top: 0;
    left: 0;
    width: 100svw;
    height: 150px;
    z-index: 10;
    display: flex;
}

.killlog {
    width: calc(100svw - 170px);
    height: 100%;
}

.maps-wrapper {
    width: 150px;
    height: 150px;
}

.maps-wrapper::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 150px;
    content: "";
    display: block;
    background-color: rgba(0, 0, 0, 0.35);
    z-index: 20;
    overflow: hidden;
}

.target {
    position: absolute;
    top: calc(50% + 25px);
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    height: auto;
    z-index: 1;
}

.under-buttons-area {
    position: absolute;
    bottom: 0px;
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

.view-button {
    transform: translateX(0px) translateY(1px);
    width: 50px;
    margin: auto;

    background-color: transparent;
    border: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}

.flash-button {
    transform: translateX(-10px);
    width: 50px;
    margin: auto;

    background-color: transparent;
    border: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}

.isView {
    filter: brightness(0.65);
}

.flash-auto {
    filter: brightness(1.2) sepia(1) saturate(8) hue-rotate(10deg);
}

.flash-on {
    filter: brightness(1.2) sepia(1) saturate(20) hue-rotate(-50deg);
}

.debug-buttons>* {
    margin: 10px;
}
</style>
