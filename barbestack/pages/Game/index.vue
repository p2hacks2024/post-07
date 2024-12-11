<template>
    <div class="game">
        <div>
            <Camera @qrCodeDetected="handleQRCode" />
            <KillLog ref="killLogRef" />
            <!-- デバッグ用ボタン -->
            <button @click="addKillLogType1">デバッグ用キルログ1追加</button>
            <button @click="addKillLogType2">デバッグ用キルログ2追加</button>
            <p v-if="scannedCode">スキャンしたQRコード: {{ scannedCode }}</p>
        </div>
        <Maps class="maps" />
        <img src="~/assets/images/target.png" alt="target" class="target" />
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import KillLog from '~/components/molecules/KillLogBox.vue';

export default {
    name: 'Index',
    components: {
        KillLog,
    },
    setup() {
        const scannedCode = ref<string | null>(null);

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
        };

        return {
            scannedCode,
            handleQRCode,
            killLogRef,
            addKillLogType1,
            addKillLogType2,
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
</style>
