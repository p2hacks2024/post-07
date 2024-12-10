<template>
    <div>
        <div class="player-wrapper">
            <div class="player-name">TestPlayer</div>
            <QRCodeGenerator msg="barbestack/123456" class="qr-code" />
        </div>
    </div>
</template>

<style scoped>
.player-wrapper {
    display: flex;
    align-items: center;
}

.player-name {
    margin: auto 10px;
}

.qr-code {
    width: 100px;
    height: 100px;
}
</style>