<template>
    <div id="map"></div>
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
        styles: [
            {
                featureType: "poi",
                elementType: "labels.text",
                stylers: [{ visibility: "off" }] // すべての施設のラベルを非表示
            },
            {
                featureType: "poi.business",
                elementType: "labels.text",
                stylers: [{ visibility: "off" }] // 商業施設のラベルを非表示
            },
            {
                featureType: "poi.school",
                elementType: "labels.text",
                stylers: [{ visibility: "off" }] // 学校のラベルを非表示
            },
            {
                featureType: "poi.medical",
                elementType: "labels.text",
                stylers: [{ visibility: "off" }] // 医療施設のラベルを非表示
            },
            {
                featureType: "poi.government",
                elementType: "labels.text",
                stylers: [{ visibility: "off" }] // 政府関連の施設のラベルを非表示
            }
        ],
        gestureHandling: 'none', // ユーザーによる回転を無効にする
        rotateControl: false, // 回転ボタンを無効にする
        zoomControl: false, // ズームボタンを無効にする
        scrollwheel: false, // スクロールでのズームを無効にする
        mapTypeControl: false, // 地図タイプのコントロールを無効にする
        fullscreenControl: false, // 全画面表示を無効にする
        streetViewControl: false, // ストリートビューのコントロールを無効にする
        copyrightControl: false, // 右下のクレジット表示を無効にする
        logoControl: false, // 左下のGoogleロゴを無効にする
        scaleControl: false, // 右下のスケール表示を無効にする
        clickableIcons: false, // マーカーのクリックを無効にする
    })
});
</script>