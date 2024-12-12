<template>
  <div class="kill-log-list">
    <KillLogMessage
      v-for="(log, index) in killLogs"
      :key="index"
      :killer="log.killer"
      :victim="log.victim"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import KillLogMessage from '~/components/atoms/KillLogMessage.vue';

interface KillLog {
  killer: string;
  victim: string;
}

export default defineComponent({
  name: 'KillLogList',
  components: {
    KillLogMessage,
  },
  setup() {
    const killLogs = ref<KillLog[]>([]);
    const maxLogCount = 5;

    const addKillLog = (killer: string, victim: string) => {
      const newLog: KillLog = { killer, victim };
      killLogs.value.push(newLog);
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
});
</script>

<style scoped>
.kill-log-list {
  position: fixed;
  top: 10px;
  right: 10px;
  max-width: 250px;
  z-index: 1000;
  display: flex;
  flex-direction: column-reverse;
}
</style>
