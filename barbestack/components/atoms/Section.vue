<template>
    <div>
        <h1><slot /></h1>
    </div>
</template>

<style scoped>
div {
    position: relative;
    height: 30px;
    margin-bottom: 20px;
}

h1::before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    display: block;
    width: 4px;
    height: 30px;
    background-color: #202020;
}

h1 {
    font-size: 22px;
    margin-left: 15px;
    height: 100%;
    line-height: 30px;
}
</style>