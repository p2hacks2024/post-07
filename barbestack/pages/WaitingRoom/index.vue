<template>
    <div>
        <Header />
        <BodyField title="待機画面">
            <p>開始までしばらくお待ちください。</p>
            <div class="room-num">
                <div>部屋番号</div>：<div>{{ roomId }}</div>
            </div>
            <div class="player-wrapper">
                <div class="">参加プレイヤー</div>
                <table>
                    <tbody>
                        <tr>
                            <th class="name">Name</th>
                            <th class="qr-code-view">QR Code</th>
                            <th class="qr-code-print">Print</th>
                        </tr>
                        <tr v-for="player in players">
                            <td>{{ player.name }}</td>
                            <td>
                                <QRCodeGenerator :msg="'barbestack/' + player" class="qr-code" />
                            </td>
                            <td>
                                <button>PDF出力</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </BodyField>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// urlのqueryを取得
import { useRoute } from 'vue-router';
import axios from "axios";

const roomId = ref("");
interface Player {
    name: string;
    id: number;
}
const players = ref<Player[]>([]);

const url = useRuntimeConfig().public.flaskApiUrl;

onMounted(async () => {
    const route = useRoute();
    const query = route.query;
    roomId.value = query.room_id as string;
    console.log(query.room_id);

    try {
        const url = useRuntimeConfig().public.flaskApiUrl; // Flask API のエンドポイント

        const response = await axios.get(
            `${url}/rooms/${roomId.value}/players`
        );

        if (response.status === 200) {
            console.log(response);
            players.value = response.data.players;
        }
    } catch (error: any) {
        console.error("エラー:", error);
        const errorMessage = error.response?.data?.message || "リクエスト失敗";
        alert("エラー：" + errorMessage);
    }

})
</script>

<style scoped>
table {
    margin-top: 5px;
    width: 100%;
    border: 2px solid black;
    border-collapse: collapse;
    text-align: center;
}

th {
    height: 40px;
}

td,
tr,
th {
    border-collapse: collapse;
    border: 1px solid black;
    text-align: center;
}

.qr-code-view {
    width: 100px;
}

.player-wrapper {
    margin-top: 20px;
    /* display: flex;
    align-items: center; */
}

.player-name {
    margin: auto 10px;
}

.qr-code {
    width: 100px;
    height: 100px;
    margin: auto;
}

.room-num {
    font-weight: bold;
    margin-top: 20px;
    margin-left: 5px;
    display: flex;
    height: 30px;
    line-height: 30px;
    width: 160px;
    text-align: center;
    border: 1px solid black;
}
</style>