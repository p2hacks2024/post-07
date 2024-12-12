<template>
  <div class="kill-log-list">
    <KillLogMessage v-for="(killLog, index) in killLogs" :key="index" :killer="killLog.killer"
      :victim="killLog.victim" />
  </div>
</template>

<script setup lang="ts">
import { defineExpose, onMounted, ref } from 'vue';

interface KillLog {
  killer: string;
  victim: string;
}

const killLogs = ref<KillLog[]>([]);
const maxLogCount = 5;

const addKillLog = (killer: string, victim: string) => {
  const newLog: KillLog = { killer, victim };
  killLogs.value.push(newLog);
  if (killLogs.value.length > maxLogCount) {
    killLogs.value.shift();
  }
};

const removeOldLogs = () => {
  setInterval(() => {
    if (killLogs.value.length > 0) {
      killLogs.value.shift();
    }
  }, 5000);
};

onMounted(() => {
  removeOldLogs();
});

defineExpose({
  addKillLog,
});

</script>

<style scoped>
.kill-log-list {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
}
</style>
