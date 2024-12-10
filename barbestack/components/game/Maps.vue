<template>
    <div id="map" style="height: 500px;"></div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    if (!window.google || !google.maps) {
        console.error('Google Maps API is not loaded correctly.')
        return
    }

    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 41.841894, lng: 140.7666500 },
        zoom: 17.6,
        tilt: 45, // 傾きを設定
        heading: 30, // 回転角度（プログラム上で設定）
        gestureHandling: 'none', // ユーザーによる回転を無効にする
        rotateControl: false, // 回転ボタンを無効にする
        zoomControl: false, // ズームボタンを無効にする
        scrollwheel: false, // スクロールでのズームを無効にする
        mapTypeControl: false, // 地図タイプのコントロールを無効にする
        fullscreenControl: false, // 全画面表示を無効にする
        streetViewControl: false, // ストリートビューのコントロールを無効にする
        copyrightControl: false, // 右下のクレジット表示を無効にする
        logoControl: false, // 左下のGoogleロゴを無効にする
    })
});
</script>