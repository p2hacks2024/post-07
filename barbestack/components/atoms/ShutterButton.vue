<template>
    <button class="shutter-button" @click="handleClick">

    </button>
</template>

<script lang="ts">
export default {
    name: 'ShutterButton',
    emits: ['click'],
    methods: {
        handleClick() {
            this.$emit('click');
        }
    }
}
</script>

<style scoped>
.shutter-button-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    /* 必要に応じて調整 */
}

.shutter-button {
    background-color: white;
    border: 2px solid #ccc;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    font-size: 16px;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.shutter-button:hover {
    background-color: #f0f0f0;
    transform: scale(1.1);
}

.shutter-button:active {
    background-color: #e0e0e0;
    transform: scale(1);
}
</style>