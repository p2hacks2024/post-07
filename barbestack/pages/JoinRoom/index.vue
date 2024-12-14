<template>
    <div>
        <Header />
        <BodyField title="ゲームに参加">
            <div>
                <p>ゲームの参加について</p>
                <ul>
                    <li>ユーザー名を入力してください</li>
                    <li>参加ボタンを押してください</li>
                    <li>部屋番号を入力してください</li>
                    <li>待機画面に遷移します</li>
                </ul>
                <div class="text-input-form">
                    <div>ユーザー名</div>
                    <input type="text" size="6" v-model="playerName" placeholder="ユーザー名を入力してください" />
                </div>
                <div class="text-input-form">
                    <div>部屋番号</div>
                    <input type="text" size="6" v-model="roomId" placeholder="部屋番号を入力してください" />
                </div>
                <div>
                    <SpinerLodingButton ref="joinButton" @click="joinRoom">参加</SpinerLodingButton>
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

const joinButton = ref<any>(null); // ボタンコンポーネントへの参照
// データの定義
const roomId = ref<string>(""); // 部屋番号の入力をバインド
const playerName = ref<string>(""); // ユーザー名の入力をバインド
const errorMessage = ref<string | null>(null);

// 部屋作成関数
const joinRoom = async () => {
    joinButton.value?.chnageLoading(true);
    try {
        const url = useRuntimeConfig().public.flaskApiUrl; // Flask API のエンドポイント

        if (!playerName.value.trim()) {
            alert("ユーザー名を入力してください");
            joinButton.value?.chnageLoading(false);
            return;
        }

        if (!roomId.value.trim()) {
            alert("部屋番号を入力してください");
            joinButton.value?.chnageLoading(false);
            return;
        }

        console.log(playerName.value.trim());

        const response = await axios.get(url + "/rooms/" + roomId.value.trim());
        console.log(response.status);
        console.log(response.data);

        if (response.status === 200) {
            console.log(response);
            errorMessage.value = null; // エラーをクリア

            const response_player = await axios.post(
                `${url}/rooms/${roomId.value.trim()}/players?player_name=${encodeURIComponent(playerName.value.trim())}`
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
                    is_host: 0,
                }
            });
        }
        else {
            alert("部屋が見つかりませんでした");
        }
    } catch (error: any) {
        console.error("エラー:", error);
        if (error.response?.status === 404) {
            alert("部屋が見つかりませんでした");
            return;
        }
        else {
            errorMessage.value = error.response?.data?.message || "リクエスト失敗";
            alert("エラー：" + errorMessage.value);
        }
    } finally {
        joinButton.value?.chnageLoading(false);
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
</style>