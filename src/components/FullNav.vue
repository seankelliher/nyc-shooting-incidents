<template>
    <nav>
        <div class="nav-link"><router-link to="/">Overview</router-link></div>
        <div class="nav-link"><router-link to="/scenes">Scenes</router-link></div>
        <div class="nav-link"><router-link to="/vics">Victims</router-link></div>
        <div class="nav-link"><router-link to="/perps">Perps</router-link></div>
    </nav>
</template>

<script>

export default {
    name: "FullNav",
    components: {},
    props: {}
};
</script>