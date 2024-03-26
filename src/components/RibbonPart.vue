<script setup>
defineProps({
    headline: {
        type: String,
        required: true
    }
});
</script>

<template>
    <div class="ribbon">
        <h2>{{ headline }}</h2>
    </div>
</template>

<style scoped>
</style>