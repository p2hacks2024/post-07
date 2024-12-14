<template>
    <div>
        <div :class="[isClick ? 'cross-button' : 'hambuger-button', 'button']" @click="isClick = !isClick">
            <div class="bar"></div>
            <div :class="isClick ? 'dammy-bar' : 'bar2'"></div>
            <div class="bar"></div>
        </div>
    </div>

    <div :class="[isClick ? 'menu-open' : 'menu-close', 'menu']" v-show="isClick" @click="isClick = false">
        <ul>
            <li><a href="https://qrkodo.kcat.dev" class="link">Product/https://qrkodo.kcat.dev</a></li>
            <li><a href="https://github.com/p2hacks2024/post-07" class="link">github/Frontend</a></li>
            <li><a href="https://github.com/kCat-fun/barbestack-p2hacks-backend-vercel" class="link">github/Backend-WebAPI</a></li>
            <li><a href="https://github.com/kCat-fun/websockets-api-barbestack-p2hacks2024" class="link">github/Backend-SocketIO</a></li>
            <li><a href="https://www.figma.com/design/jv6MKyLpSgZ68huaMyl0AY/P2HACKS%E7%94%BB%E9%9D%A2%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3?node-id=0-1&t=UR1bJbl0Zjm2Mb43-1" class="link">Figma/Design</a></li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const isClick = ref(false);
</script>

<style scoped>
.button {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    z-index: 5;
}

.button:hover {
    cursor: pointer;
}

.button>.bar {
    content: '';
    width: 30px;
    height: 2px;
    border-radius: 5px;
    background-color: #000;
    margin: 6.4px auto;
    position: relative;
    top: 5.5px;
    transition: 0.3s ease-in-out;
}

.button>.dammy-bar {
    content: '';
    width: 30px;
    height: 2px;
    border-radius: 5px;
    background-color: #000;
    margin: 6.4px auto;
    position: relative;
    top: 5.5px;
    opacity: 0;
    transform: scaleX(1) translateX(10px);
    animation: cross-anim 0.6s;
}

.button>.bar2 {
    content: '';
    width: 30px;
    height: 2px;
    border-radius: 5px;
    background-color: #000;
    margin: 6.4px auto;
    position: relative;
    top: 5.5px;
    transition: 0.4s ease-in-out;
    transform: scaleX(1) translateX(0);
    opacity: 1;
}

@keyframes cross-anim {
    75% {
        transform: scaleX(1) rotateZ(0deg);
        opacity: 1;
    }

    100% {
        transform: scaleX(1) rotateZ(0deg) translateX(-5px);
        opacity: 0.3;
    }
}

.cross-button>.bar:nth-child(1) {
    transform: rotateZ(45deg) translateX(7px) translateY(5px);
}

.cross-button>.bar:nth-child(3) {
    transform: rotateZ(-45deg) translateX(7px) translateY(-5px);
}

.menu-close {
    top: -100vh;
}

.menu-open {
    animation: menu-open 0.3s;
}

@keyframes menu-open {
    0% {
        left: -100vw;
        opacity: 0;
    }

    5% {
        left: -70vw;
        opacity: 0;
    }

    100% {
        left: 0;
        opacity: 1;
    }
}

.menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 500px;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    flex-direction: column;
    justify-content: center;
}

@keyframes menu-str-open {
    0% {
        opacity: 0;
    }

    40% {
        opacity: 0;
        transform: translateY(-30px);
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
        transform: translateY(0px);
    }
}

ul {
    animation: menu-str-open 0.6s;
    margin: auto;
    line-height: 50px;
}

li {
    list-style: none;
}

.link {
    font-size: 18px;
    color: white;
    text-decoration: underline;
    text-align: center;
    font-weight: unset;
}
</style>