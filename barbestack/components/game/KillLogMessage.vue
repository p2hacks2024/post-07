<template>
  <div class="kill-log-message">
    {{ killer }} は {{ victim }} を倒した
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'KillLogMessage',
  props: {
    killer: {
      type: String,
      required: true,
    },
    victim: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.kill-log-message {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  margin: 5px 0;
  border-radius: 5px;
  font-size: 14px;
}
</style>
