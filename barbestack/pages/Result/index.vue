<template>
    <div>
        <Header />
        <BodyField title="評価一覧">
            <ul>
                <li>{{ className }}</li>
                <li><b>評価：</b>{{ isWinner ? "S" : "F" }}</li>
                <li><b>習得日：</b>{{ new Date().toLocaleDateString() }}</li>
                <li><b>出席：</b>{{ killCount }} / 15</li>
            </ul>
            <NuxtLink to="/">トップに戻る</NuxtLink>
        </BodyField>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, onUnmounted } from 'vue';

const route = useRoute();

const className = ref("");
const killCount = ref(0);
const isWinner = ref(false);

const classNames = [
    "アリゴリズムとデータ構造",
    "電子工学基礎",
    "システムプログラミング",
    "人体生理学",
    "線形代数学Ⅰ",
    "応用数学Ⅱ",
    "オペレーションズリサーチ",
    "確率統計学",
    "認知心理学",
    "認知心理学演習",
    "メディアの科学",
    "VEPⅡ",
    "微分方程式",
    "人工知能続論",
    "形式言語とオートマトン",
    "コミュニケーションⅢ",
    "センサ工学",
    "ハードウェア設計",
    "オペレーティングシステム",
    "解析学Ⅰ"
];

onMounted(() => {
    const query = route.query;
    let roomId = query.room_id as string;
    className.value = classNames[Number(roomId) % classNames.length];
    killCount.value = Number(query.kill_count) as number;
    isWinner.value = (query.is_winner === "1");

    if (isWinner.value) {
        killCount.value = 15;
    }
});

</script>

<style scoped>
ul>* {
    padding: 0;
}

ul {
    list-style: none;
    padding: 0;
    margin: 20px auto;
    border: 2px solid #000;
}

li {
    font-size: 16px;
    width: calc(100% - 10px);
    margin: 0;
    padding: 10px 5px;
}

li:not(:last-child) {
    border-bottom: 1px solid #000;
}
</style>