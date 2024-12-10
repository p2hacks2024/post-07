// plugins/google-maps.client.ts
export default defineNuxtPlugin(() => {
    // Google Maps API の読み込み
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${useRuntimeConfig().public.googleMapsApiKey}&callback=initMap`
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    // initMap を window に定義
    window.initMap = () => {
        console.log('Google Maps API Loaded')
    }
})
