<template>
    <div>
        <button class="shutter-button" :class="{ 'loading': isLoading }" :disabled="isDisabled" @click="handleClick">
            <div v-if="isLoading" class="loader"></div>
        </button>
    </div>
</template>

<script lang="ts">
export default {
    name: 'ShutterButton',
    emits: ['click'],
    data() {
        return {
            isDisabled: false,
            isLoading: false,
        };
    },
    methods: {
        handleClick() {
            this.isDisabled = true;
            this.isLoading = true;

            // Emit the click event
            this.$emit('click');

            // Simulate a 3-second delay
            setTimeout(() => {
                this.isDisabled = false;
                this.isLoading = false;
            }, 3000);
        },
    },
};
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
    position: relative;
}

.shutter-button:disabled {
    cursor: not-allowed;
}

.shutter-button::before {
    content: '';
    display: block;
    width: 52px;
    height: 52px;
    border: 2px solid #000;
    border-radius: 50%;
    background-color: #fff;
    transition: background-color 0.3s ease;
}

.shutter-button:hover:not(:disabled) {
    background-color: #f0f0f0;
    transform: scale(1.1);
}

.shutter-button:active:not(:disabled) {
    background-color: #e0e0e0;
    transform: scale(1);
}

/* ロード中のスタイル */
.shutter-button.loading {
    background-color: #dcdcdc;
    /* ボタン全体を暗く */
}

.shutter-button.loading::before {
    background-color: #bbbbbb;
    /* 内側も暗く */
}

.loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #333;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
    position: absolute;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>