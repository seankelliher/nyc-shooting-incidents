<script setup>
defineProps({
    headline: {
        type: String,
        required: true
    }
});
</script>

<template>
    <header>
        <div class="items-left">
            <figure class="logo-header">
                <img src="/nyc-logo.svg" alt="logo for the New York City government">
                <figcaption hidden>logo for the New York City government</figcaption>
            </figure>
            <div class="pipe">|</div>
            <div class="header-text">
                <a href="https://opendata.cityofnewyork.us" target="_blank"><h1>{{ headline }}</h1></a>
            </div>
        </div>
        <div class="items-right">
            <div class="header-text">
                <a href="https://www.nyc.gov/311/index.page" target="_blank">311</a>
            </div>
            <div class="pipe">|</div>
            <div class="header-text">
                <a href="https://www.nyc.gov/home/search/index.page" target="_blank">Search all NYC.gov websites</a>
            </div>
        </div>
    </header>
</template>

<style scoped>
</style>