<template>
    <header>
        <div class="menu-button">
            <Hamburgermenu class="menu" />
        </div>
        <img src="~/assets/images/logo.png" alt="logo" class="logo" />
    </header>
</template>

<style scoped>
header {
    display: flex;
    align-items: center;
    vertical-align: middle;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 50px;
}

.menu-button {
    margin: auto 20px auto 15px;
}

.menu-button>* {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.logo {
    width: auto;
    height: 50%;
}
</style>