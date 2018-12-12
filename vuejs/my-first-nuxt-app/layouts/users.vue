<template>
    <div>
        <Header />
        <header>
            USERS SECTION
        </header>
        <nuxt/>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
    components: {
        Header,
    }
}
</script>

<style scoped>
html, body {
    margin: 0;
    color: yellow;
}
</style>

