<template>
    <div id="map" :class="isViewMapMode ? 'view-map-mode' : 'small-map-mode'" />
</template>

<script setup>
import { onMounted, onUnmounted, defineExpose } from 'vue';

const isViewMapMode = ref(false);

let locations = [];

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

                for (const _location of locations) {
                    new google.maps.Circle({
                        strokeColor: "#FF0000", // 赤色
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: "#FF0000",
                        fillOpacity: 0.4,
                        map: map,
                        center: _location,
                        radius: 3, // 半径 5m
                    });
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

// 座標データを受け取り、赤丸でプロットする関数
const plotLocations = (_locations) => {
    locations = _locations;
}

const changeViewMode = () => {
    isViewMapMode.value = !isViewMapMode.value;

    if (isViewMapMode.value) {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 41.84180019381427, lng: 140.76664932881579 }, // 初期値
            zoom: 17.75,
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

        for (const _location of _locations) {
            new google.maps.Circle({
                strokeColor: "#FF0000", // 赤色
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.4,
                map: map,
                center: _location,
                radius: 3, // 半径 5m
            });
        }
    }
    else {
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

        for (const _location of _locations) {
            new google.maps.Circle({
                strokeColor: "#FF0000", // 赤色
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.4,
                map: map,
                center: _location,
                radius: 3, // 半径 5m
            });
        }
    }
};

const getIsViewMapMode = () => {
    return isViewMapMode.value;
};

defineExpose({
    changeViewMode,
    getIsViewMapMode,
    plotLocations,
});
</script>

<style scoped>
.small-map-mode {
    width: 250%;
    height: 250%;
    transform: scale(0.4) translate(-75%, -75%);
}

.view-map-mode {
    width: 100svw;
    height: 100svh;
    z-index: 40;
}

.view-map-mode::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100svw;
    height: 100svh;
    content: "";
    display: block;
    background-color: rgba(0, 0, 0, 0.35);
    z-index: 50;
    overflow: hidden;
}
</style>