<template>
    <div ref="canvas"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import p5 from 'p5';

const canvas = ref<HTMLDivElement | null>(null);

const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(400, 400).parent(canvas.value!);
    };

    p.draw = () => {
        p.background(200);
        p.ellipse(p.width / 2, p.height / 2, 50, 50);
    };
};

onMounted(() => {
    new p5(sketch);
});
</script>

<style scoped>
/* 必要ならスタイルを追加 */
</style>