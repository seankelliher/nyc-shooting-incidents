<template>
    <div class="view-title">
        <h2>{{ title }}</h2>
    </div>
</template>

<script>
export default {
    name: "ViewTitle",
    props: {
        title: {
            type: String,
            required: true
        }
    }
};
</script>