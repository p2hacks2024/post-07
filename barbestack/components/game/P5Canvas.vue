<template>
    <div ref="canvas"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Main from '~/scripts/game/main';

// 型定義
type P5 = typeof import('p5');

const canvas = ref<HTMLDivElement | null>(null);

onMounted(async () => {
    // p5.js を動的にインポート
    const p5Module: P5 = (await import('p5')).default;

    if (canvas.value) {
        const sketch = (p: InstanceType<P5>) => {
            const main = new Main(p);

            p.setup = () => {
                main.setup();
            };

            p.draw = () => {
                main.draw();
            };
        };

        // p5 インスタンスを作成
        new p5Module(sketch);
    } else {
        console.error('Canvas element is not available.');
    }
});
</script>

<style scoped>
/* 必要ならスタイルを追加 */
</style>