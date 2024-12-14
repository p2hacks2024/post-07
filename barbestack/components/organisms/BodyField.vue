<template>
    <main>
        <Section>{{ title }}</Section>
        <div class="content">
            <slot />
        </div>
    </main>
</template>

<script setup lang="ts">
defineProps({
    title: String,
});
</script>

<style scoped>
main {
    margin: 15px;
    padding: 15px 10px;
    width: calc(100% - 50px);
    min-height: calc(100svh - 110px);
    background-color: white;
    color: black;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.content {
    padding: 0 5px;
}
</style>