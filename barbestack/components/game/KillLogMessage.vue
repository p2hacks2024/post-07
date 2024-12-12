<template>
  <div class="kill-log-message">
    {{ killer }} が {{ victim }} を倒した
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
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
  border-radius: 5px 3px;
  font-size: 14px;
}
</style>
