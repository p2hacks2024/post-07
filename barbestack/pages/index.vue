<template>
    <div>
        <NuxtLink to="/CreateRoom">Create</NuxtLink>
        <br />
        <NuxtLink to="/JoinRoom">Join</NuxtLink>
    </div>
</template>

<!-- <script setup="ts">
import { onMounted, onUnmounted } from 'vue';
import { io } from "socket.io-client";

const socket = ref(io("wss://gmktec-tailscale:5000"));

onMounted(() => {
    // send a message to the server
    socket.value.emit("method1", { data: "hello" });
    // receive a message from the server
    socket.value.on("receive_message", (...args) => {
        // ...
        console.log(args);
    });
});

onUnmounted(() => {
    // ...
    socket.value.emit("leave", { data: { room: 1 } });
    socket.value.emit("leave", { data: { room: 2 } });
    socket.value.close();
});
</script> -->

<style></style>