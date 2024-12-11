<template>
  <div class="kill-log-item">{{ message }}</div>
</template>

<script lang="ts">
export default {
  name: 'PlayerKillLog',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.kill-log-item {
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 8px;
  margin: 3px 0;
  border-radius: 4px;
  font-size: 12px;
  text-align: center;
}
</style>
