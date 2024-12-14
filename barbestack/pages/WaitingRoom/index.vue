<template>
    <div>
        <Header />
        <BodyField title="待機画面">
            <p>開始までしばらくお待ちください。</p>
            <div class="room-num">
                <div>部屋番号</div>：<div>{{ roomId }}</div>
            </div>
            <div class="player-wrapper">
                <div>参加プレイヤー</div>
                <table>
                    <tbody>
                        <tr>
                            <th class="name">Name</th>
                            <th class="qr-code-view">QR Code</th>
                            <th class="qr-code-print">Print</th>
                        </tr>
                        <tr v-for="player in players">
                            <td :class="player.player_id == playerId ? 'me-player' : ''">
                                {{ player.name }}
                            </td>
                            <td>
                                <QRCodeGenerator :msg="'barbestack/' + player.player_id" class="qr-code" :data-id="player.player_id" />
                            </td>
                            <td>
                                <button @click="generatePDF(player.player_id)">PDF出力</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <SpinerLodingButton ref="exitWaitingRoomButton" @click="exitWaitingRoom">退室</SpinerLodingButton>
                <SpinerLodingButton ref="startButton" @click="gameStartButton" v-show="isHost">ゲーム開始
                </SpinerLodingButton>
            </div>
        </BodyField>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onMounted, onUnmounted } from 'vue';
import { io } from "socket.io-client";
// urlのqueryを取得
import { useRoute, useRouter } from 'vue-router';
import axios from "axios";
import jsPDF from "jspdf";

const generatePDF = (playerId: number) => {
    // 対象のQRコード要素を取得
    const qrCodeElement = document.querySelector(`.qr-code[data-id="${playerId}"]`) as HTMLElement;

    if (!qrCodeElement) {
        alert("QRコードが見つかりません");
        return;
    }

    // QRコードをCanvasに描画
    const canvas = document.createElement("canvas");
    canvas.width = 2480; // A4サイズの幅（ピクセル、300dpi換算）
    canvas.height = 3508; // A4サイズの高さ（ピクセル、300dpi換算）
    const context = canvas.getContext("2d");

    if (!context) {
        alert("Canvasコンテキストが取得できません");
        return;
    }

    // QRコードをCanvasに描画（スタイルを調整）
    const qrCodeImage = qrCodeElement.querySelector("img") as HTMLImageElement;
    if (qrCodeImage) {
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height); // 背景を白で塗りつぶす
        const size = Math.min(canvas.width, canvas.height); // A4いっぱいに表示
        context.drawImage(qrCodeImage, (canvas.width - size) / 2, (canvas.height - size) / 2, size, size);
    }

    // jsPDFでPDFを生成
    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
    });

    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 595, 842); // PDFにCanvasを追加
    pdf.save(`qr_code_${playerId}.pdf`); // PDFを保存
};


const url = useRuntimeConfig().public.flaskApiUrl;
const route = useRoute();
const router = useRouter();

const socket = ref(io(useRuntimeConfig().public.webSocketApiUrl));

const exitWaitingRoomButton = ref<any>(null); // ボタンコンポーネントへの参照
const startButton = ref<any>(null); // ボタンコンポーネントへの参照

const roomId = ref("");
interface Player {
    name: string;
    player_id: number;
}
const players = ref<Player[]>([]);
const playerId = ref(0);
const isHost = ref(false);
const isExit = ref(true);

onMounted(async () => {
    const query = route.query;
    roomId.value = query.room_id as string;
    playerId.value = Number(query.player_id) as number;
    isHost.value = (query.is_host === "1");
    console.log(query.room_id);

    // 部屋に参加
    socket.value.emit("join", { room: roomId.value });
    socket.value.emit("diff_player", { room: roomId.value });

    // サーバーからの応答を受け取る
    socket.value.on("start_event", (data: any) => {
        isExit.value = false;
        console.log("ゲーム開始イベントを受信:", data);
        // ページ遷移
        router.push({
            name: "Game",
            query: {
                room_id: roomId.value,
                player_id: playerId.value,
            }
        });
    });

    socket.value.on("diff_player", async (data: any) => {
        console.log("プレーヤー数変更:", data);
        try {
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
            // alert("エラー：" + errorMessage);
        }
    });

    try {
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
        // alert("エラー：" + errorMessage);
    }
});

onUnmounted(() => {
    if (isExit.value) {
        exitWaitingRoom();
    }
});

const exitWaitingRoom = async () => {
    console.log("exitWaitingRoom");
    exitWaitingRoomButton.value?.chnageLoading(true);

    try {
        const response = await axios.delete(
            `${url}/rooms/${roomId.value}/players/${playerId.value}`
        );

        if (response.status === 200) {
            console.log(response);
            router.push({
                path: "/"
            });
        }
        else {
            alert("退室に失敗しました");
            return;
        }
    } catch (error: any) {
        console.error("エラー:", error);
        const errorMessage = error.response?.data?.message || "リクエスト失敗";
        // alert("エラー：" + errorMessage);
    }

    socket.value.emit("diff_player", { room: roomId.value });
    socket.value.emit("leave", { room: roomId.value });
    // ソケットをクリーンアップ
    socket.value.off("start_event");
    socket.value.off("diff_player");
    socket.value.disconnect();

    exitWaitingRoomButton.value?.chnageLoading(false);
}

const gameStartButton = () => {
    startButton.value?.chnageLoading(true);
    console.log("gameStartButton");

    if (players.value.length <= 1) {
        alert("プレイヤーが2人以上いる必要があります");
    }
    else {
        socket.value.emit("start_event", { room: roomId.value });
    }
    startButton.value?.chnageLoading(false);
}
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

.game-button {
    width: 100px;
    height: 35px;
    margin-top: 25px;
    margin-left: 5px;
    background-color: #E0E0E0;
    border: solid 1px #CACACA;
    color: black;
    border-radius: 5px;
    font-size: 16px;
}

.me-player {
    text-decoration: underline;
}

/* スピナーのスタイル */
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