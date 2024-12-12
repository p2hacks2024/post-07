<template>
    <div class="game">
        <div>
            <Camera @qrCodeDetected="handleQRCode" />
            <KillLog ref="killLogRef" />
            <div class="killlog-buttons">
                <button @click="addKillLogType1">デバッグ用キルログ追加 (タイプ1)</button>
                <button @click="addKillLogType2">デバッグ用キルログ追加 (タイプ2)</button>
                <p v-if="scannedCode">スキャンしたQRコード: {{ scannedCode }}</p>
            </div>
        </div>
        <Maps class="maps" v-show="isView" />
        <img src="~/assets/images/target.png" alt="target" class="target" />
        <div class="under-buttons-area">
            <UnderBalckBackground class="under-black-background" />
            <div class="under-buttons">
                <button class="view-button" @click="changeView">
                    <img src="~/assets/images/ViewButton.png" :class='isView ? "view" : "isView"' alt="button" />
                </button>
                <ShutterButton @click="triggerCameraScan" />
                <button class="flash-button" @click="changeFlash">
                    <img src="~/assets/images/FlashButton.png" :class=flashPattern alt="button" />
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    name: 'Index',
    setup() {
        const scannedCode = ref<string | null>(null);
        const camera = ref(null); // Camera コンポーネントへの参照
        const isView = ref(true);
        const flashPatterns = ['flash-off', 'flash-auto', 'flash-on'];
        const flashPatternNum = ref(0);
        const flashPattern = ref("");

        const handleQRCode = (code: string) => {
            scannedCode.value = code; // QRコードの内容を保存
        };

        const killLogRef = ref<{ addKillLog: (killer: string, victim: string) => void } | null>(null);

        // デバッグ用キルログを追加するメソッド（タイプ1）
        const addKillLogType1 = () => {
            if (killLogRef.value) {
                killLogRef.value.addKillLog('Player1', 'Player2'); // Player1がPlayer2をキル
            }
        };

        // デバッグ用キルログを追加するメソッド（タイプ2）
        const addKillLogType2 = () => {
            if (killLogRef.value) {
                killLogRef.value.addKillLog('Player3', 'Player4'); // Player3がPlayer4をキル
            }
        }

        const triggerCameraScan = () => {
            (camera.value as any)?.flashDetectQRCode();
        };

        const changeView = () => {
            isView.value = !isView.value;
        };

        const changeFlash = () => {
            flashPatternNum.value = (flashPatternNum.value + 1) % flashPatterns.length;
            (camera.value as any)?.changeLightType(flashPatternNum.value);
            flashPattern.value = flashPatterns[flashPatternNum.value];
        }

        return {
            scannedCode,
            handleQRCode,
            killLogRef,
            addKillLogType1,
            addKillLogType2,
            triggerCameraScan,
            changeView,
            changeFlash,
            flashPattern,
            isView,
            camera,
        };
    },
};
</script>

<style scoped>
.game {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
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
    width: 90vw;
    height: auto;
    z-index: 1;
}

.under-buttons-area {
    position: absolute;
    bottom: 50px;
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

.isView {
    filter: brightness(0.65);
}

.flash-auto {
    filter: brightness(1.2) sepia(1) saturate(8) hue-rotate(10deg);
}

.flash-on {
    filter: brightness(1.2) sepia(1) saturate(20) hue-rotate(-50deg);
}

.killlog-buttons {
    color: white;
    z-index: 100;
}
</style>
