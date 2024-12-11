<template>
    <div class="game">
        <div>
            <Camera @qrCodeDetected="handleQRCode" />
            <KillLog ref="killLogRef" />
            <button @click="addTestKillLog">デバッグ用キルログ追加</button>
            <p v-if="scannedCode">スキャンしたQRコード: {{ scannedCode }}</p>
        </div>
        <Maps class="maps" />
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import KillLog from '~/components/molecules/KillLog.vue'; // 必要な場合

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

        // KillLogコンポーネントの型を指定
        const killLogRef = ref<{ addKillLog: (killer: string, victim: string) => void } | null>(null);

        // デバッグ用のキルログを追加するメソッド
        const addTestKillLog = () => {
            if (killLogRef.value) {
                killLogRef.value.addKillLog('Player1', 'Player2'); // Player1がPlayer2をキル
            }
        };

        return {
            scannedCode,
            handleQRCode,
            killLogRef,
            addTestKillLog,
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
