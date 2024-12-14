<template>
    <div>
        <Header />
        <!-- BodyFieldセクション -->
        <BodyField title="QR行動">
            <div class="column">
                <div class="card">
                    <span class="circle-icon">バ</span>
                    <div class="info">
                        <h3>QR行動について</h3>
                        <p>ストーリー：QR行動はマッドサイエンティストの教授によって開発された、単位をかけたデスゲームです。</p>
                        <a href="https://github.com/p2hacks2024/post-07" class="link">詳しく見る</a>
                    </div>
                </div>
                <div class="card">
                    <span class="circle-icon">バ</span>
                    <div class="info">
                        <h3>ゲームに参加する</h3>
                        <p>ゲームに参加する</p>
                        <NuxtLink to="/JoinRoom" class="link">詳しく見る</NuxtLink>
                    </div>
                </div>
                <div class="card">
                    <span class="circle-icon">バ</span>
                    <div class="info">
                        <h3>ゲームを開催する</h3>
                        <p>ゲームを開催する</p>
                        <NuxtLink to="/CreateRoom" class="link">詳しく見る</NuxtLink>
                    </div>
                </div>
            </div>
        </BodyField>
    </div>
</template>

<scirpt setup lang="ts">
</scirpt>

<style scoped>
.column {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.info {
    width: 100%;
}

.card {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 15px;
}

.circle-icon {
    flex-shrink: 0;
    background-color: #ccc;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    font-weight: bold;
}

.info h3 {
    margin: 0;
    font-size: 18px;
}

.info p {
    margin: 5px 0 10px;
    color: #555;
}

.link {

    color: #007bff;
    text-decoration: none;
    font-size: 14px;
    align-self: flex - start;
    margin-top: 5px;
}
</style>