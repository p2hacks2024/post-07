<template>
    <div>
        <button class="shutter-button" @click="handleClick" />
    </div>
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
.shutter-button {
    background-color: white;
    border: 2px solid #ccc;
    border-radius: 50%;
    width: 65px;
    height: 65px;
    font-size: 16px;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.2s ease;
    z-index: 10;
}

.shutter-button::before {
    content: '';
    display: block;
    width: 52px;
    height: 52px;
    border: 2px solid #000;
    border-radius: 50%;
    background-color: #fff;
    z-index: 11;
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