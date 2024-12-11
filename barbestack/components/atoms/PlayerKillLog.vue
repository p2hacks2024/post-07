<template>
  <div class="kill-log-item">
    <span class="killer">{{ killer }}</span> <span class="victim">{{ victim }}</span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PlayerKillLog',
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
};
</script>

<style scoped>
.kill-log-item {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  font-size: 16px;
}

.killer {
  font-weight: bold;
}

.victim {
  color: #f00;
}
</style>
