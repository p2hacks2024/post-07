<template>
    <div id="map" style="width: 100%;"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
    if (!window.google || !google.maps) {
        console.error('Google Maps API is not loaded correctly.');
        return;
    }

    // 初期マップの設定
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 41.841894, lng: 140.7666500 }, // 初期値
        zoom: 17.6,
        styles: [
            {
                featureType: "poi",
                elementType: "labels.text",
                stylers: [{ visibility: "off" }] // 施設ラベルを非表示
            }
        ],
        gestureHandling: 'none',
        rotateControl: false,
        zoomControl: false,
        scrollwheel: false,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        copyrightControl: false,
        logoControl: false,
        scaleControl: false,
        clickableIcons: false,
    });

    // 外側の薄い青丸と内側の濃い青丸を管理するオブジェクト
    let outerCircle;
    let innerCircle;

    // 現在地をリアルタイムで更新する
    if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const currentLocation = { lat: latitude, lng: longitude };

                // 外側の薄い青丸が存在しない場合は新規作成
                if (!outerCircle) {
                    outerCircle = new google.maps.Circle({
                        strokeColor: "#4285F4", // 青色
                        strokeOpacity: 0.6,
                        strokeWeight: 2,
                        fillColor: "#4285F4",
                        fillOpacity: 0.2,
                        map: map,
                        center: currentLocation,
                        radius: 10, // 半径 20m
                    });
                } else {
                    // 外側の薄い青丸の位置を更新
                    outerCircle.setCenter(currentLocation);
                }

                // 内側の濃い青丸が存在しない場合は新規作成
                if (!innerCircle) {
                    innerCircle = new google.maps.Circle({
                        strokeColor: "#0057D8", // 濃い青色
                        strokeOpacity: 1,
                        strokeWeight: 0,
                        fillColor: "#0057D8",
                        fillOpacity: 1,
                        map: map,
                        center: currentLocation,
                        radius: 5, // 半径 5m
                    });
                } else {
                    // 内側の濃い青丸の位置を更新
                    innerCircle.setCenter(currentLocation);
                }
            },
            (error) => {
                console.error('現在地を取得できませんでした:', error);
            },
            { enableHighAccuracy: true, maximumAge: 0 } // 高精度モードを有効化
        );

        // ページが閉じられる際に位置情報の監視を停止
        onUnmounted(() => {
            navigator.geolocation.clearWatch(watchId);
        });
    } else {
        console.error('このブラウザは現在地情報をサポートしていません。');
    }
});
</script>
