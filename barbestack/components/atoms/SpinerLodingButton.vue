<template>
    <div>
        <!-- ロード中でない場合はボタン、ロード中はスピナー -->
        <button v-if="!isLoading" class="spiiner-loading-button">
            <slot />
        </button>
        <div v-else class="spinner"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from "vue";

const isLoading = ref(false); // ロード中フラグ

const chnageLoading = (flag: boolean) => {
    isLoading.value = flag;
}

defineExpose({
    chnageLoading,
});
</script>

<style scoped>
.spiiner-loading-button {
    width: 100px;
    height: 35px;
    margin-top: 25px;
    background-color: #E0E0E0;
    border: solid 1px #CACACA;
    color: black;
    border-radius: 5px;
    font-size: 16px;
}

.spinner {
    width: 35px;
    height: 35px;
    margin-top: 25px;
    border: 4px solid #E0E0E0;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
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