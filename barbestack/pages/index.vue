<template>
    <div>
        <Header />
        <!-- BodyFieldセクション -->
        <BodyField title="QR行動">
            <div class="column">
                <div class="card">
                    <span class="circle-icon">バ</span>
                    <div class="info">
                        <div class="data">2024年12月15日</div>
                        <div class="section">
                            <h3>QR行動について</h3>
                        </div>
                        <p>ストーリー：QR行動はマッドサイエンティストの教授によって開発された、単位をかけたデスゲームです。</p>
                        <div class="link-wrapper">
                            <a href="https://github.com/p2hacks2024/post-07" class="link">詳しく見る</a>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <span class="circle-icon">バ</span>
                    <div class="info">
                        <div class="data">2024年12月15日</div>
                        <div class="section">
                            <h3>ゲームに参加する</h3>
                        </div>
                        <p>ゲームに参加する</p>
                        <div class="link-wrapper">
                            <NuxtLink to="/JoinRoom" class="link">詳しく見る</NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <span class="circle-icon">バ</span>
                    <div class="info">
                        <div class="data">2024年12月15日</div>
                        <div class="section">
                            <h3>ゲームを開催する</h3>
                        </div>
                        <p>ゲームを開催する</p>
                        <div class="link-wrapper">
                            <NuxtLink to="/CreateRoom" class="link">詳しく見る</NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="list-link">
                    <NuxtLink to="/">一覧</NuxtLink>
                </div>
            </div>
        </BodyField>
    </div>
</template>

<scirpt setup lang="ts">
</scirpt>

<style scoped>
.info {
    width: 100%;
}

.data {
    color: #999;
    font-size: 15px;
}

.section {
    position: relative;
    padding-left: 60px;
}

.section::before {
    position: absolute;
    top: -8px;
    left: 0;
    content: '未読';
    line-height: 25px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    font-size: 16px;
    display: block;
    width: 50px;
    height: 25px;
    background-color: #ba2020;
    margin: 10px 0;
}

.card {
    margin: 10px auto;
    background-color: #fff;
    /* border-radius: 8px; */
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */
    border-bottom: 1px solid #DCDCDC;
    padding: 15px;
}

.circle-icon {
    margin-bottom: 10px;
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
    text-align: right;
    color: gray;
    text-decoration: none;
    font-size: 14px;
}

.link-wrapper {
    display: flex;
    justify-content: right;
}

.list-link {
    margin: auto;
    width: 100%;
    text-align: center;
}

.list-link a {
    color: #00BCD4;
    text-decoration: none;
}
</style>