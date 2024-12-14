<template>
    <div>
        <Header />
        <BodyField title="ゲームを開催する">
            <div>
                <p>ゲームの主催について</p>
                <ul>
                    <li>ユーザー名を入力してください</li>
                    <li>作成ボタンを押してください</li>
                    <li>待機画面に遷移します</li>
                    <li>右上に表示される数字を共有してください</li>
                </ul>
                <div class="text-input-form">
                    <div>ユーザー名</div>
                    <input type="text" size="6" v-model="playerName" placeholder="ユーザー名を入力してください" />
                </div>
                <div>
                    <!-- ロード中でない場合はボタン、ロード中はスピナー -->
                    <button v-if="!isLoading" @click="createRoom" class="next-button">作成</button>
                    <div v-else class="spinner"></div>
                </div>
            </div>
        </BodyField>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router';
import axios from "axios";

const router = useRouter();

// データの定義
const roomId = ref<string | null>(null);
const playerName = ref<string>(""); // ユーザー名の入力をバインド
const errorMessage = ref<string | null>(null);
const isLoading = ref(false); // ロード中フラグ

// 部屋作成関数
const createRoom = async () => {
    isLoading.value = true; // ロード中に設定
    try {
        const url = useRuntimeConfig().public.flaskApiUrl; // Flask API のエンドポイント

        if (!playerName.value.trim()) {
            alert("ユーザー名を入力してください");
            isLoading.value = false;
            return;
        }

        console.log(playerName.value.trim());

        const response = await axios.post(url + "/rooms");
        console.log(response.status);
        console.log(response.data);

        if (response.status === 200) {
            console.log(response);
            roomId.value = response.data.room_id; // 部屋IDを設定
            errorMessage.value = null; // エラーをクリア

            const response_player = await axios.post(
                `${url}/rooms/${roomId.value}/players?player_name=${encodeURIComponent(playerName.value.trim())}`
            );

            if (response_player.status !== 200) {
                alert("入室に失敗しました");
                return;
            }

            console.log(response_player);

            // ページ遷移
            router.push({
                name: "WaitingRoom",
                query: {
                    room_id: roomId.value,
                    player_id: response_player.data.player_id,
                    is_host: 1,
                }
            });
        }
    } catch (error: any) {
        console.error("エラー:", error);
        errorMessage.value = error.response?.data?.message || "リクエスト失敗";
        alert("エラー：" + errorMessage.value);
    } finally {
        isLoading.value = false; // ロード終了
    }
};
</script>

<style scoped>
ul {
    margin-top: 10px;
    margin-left: 25px;
    line-height: 30px;
}

.text-input-form {
    margin-top: 20px;
    width: 100%;
}

.text-input-form>input {
    width: calc(100% - 5px);
    height: 30px;
    margin-top: 5px;
}

.next-button {
    width: 100px;
    height: 35px;
    margin-top: 25px;
    background-color: #E0E0E0;
    border: solid 1px #CACACA;
    color: black;
    border-radius: 5px;
    font-size: 16px;
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