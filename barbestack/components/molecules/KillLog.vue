<template>
  <div class="kill-log-container">
    <PlayerKillLog
      v-for="(log, index) in killLogs"
      :key="index"
      :killer="log.killer"
      :victim="log.victim"
    />
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import PlayerKillLog from '~/components/atoms/PlayerKillLog.vue';

interface KillLog {
  killer: string;
  victim: string;
}

export default {
  name: 'KillLog',
  components: {
    PlayerKillLog,
  },
  setup() {
    const killLogs = ref<KillLog[]>([]);
    const maxLogCount = 5; // 画面に表示する最大数

    // キルログを追加する関数
    const addKillLog = (killer: string, victim: string) => {
      const newLog: KillLog = { killer, victim };
      killLogs.value.push(newLog);

      // ログが多すぎる場合、最古のものを削除
      if (killLogs.value.length > maxLogCount) {
        killLogs.value.shift();
      }
    };

    // キルログを削除するタイマー
    const removeOldLogs = () => {
      setInterval(() => {
        if (killLogs.value.length > 0) {
          killLogs.value.shift();
        }
      }, 5000); // 5秒ごとに古いログを削除
    };

    onMounted(() => {
      removeOldLogs(); // コンポーネントがマウントされた時にタイマーを開始
    });

    onUnmounted(() => {
      // タイマーのクリーンアップ（不要な場合は省略可）
    });

    return {
      killLogs,
      addKillLog,
    };
  },
};
</script>

<style scoped>
.kill-log-container {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 300px;
  z-index: 999;
  display: flex;
  flex-direction: column-reverse;
}

.kill-log-item {
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  font-size: 14px;
}
</style>
