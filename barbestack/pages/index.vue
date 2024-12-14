<template>
    <div>
        <NuxtLink to="/CreateRoom">Create</NuxtLink>
        <br />
        <NuxtLink to="/JoinRoom">Join</NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from "axios";

const url = useRuntimeConfig().public.webSocketApiUrl;

onMounted(async () => {
    try {
        const response = await axios.get(
            `${url}/hello`
        );

        if (response.status === 200) {
            console.log(response);
        }
    } catch (error: any) {
        console.error("エラー:", error);
        // alert("エラー：" + errorMessage);
    }
});
</script>

<style></style>