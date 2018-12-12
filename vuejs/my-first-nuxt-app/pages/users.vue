<template>
    <div>
        <input type="text" v-model="userId" />
        <button @click="onLoadUser">Load User</button>
        <nuxt-child />
    </div>
</template>

<script>

    export default {
        data(){
            return {
                userId: ''
            }
        },
        methods: {
            onLoadUser(){
                this.$router.push('/users/'+ this.userId);
            }
        },
        // Reference layouts/users.vue layout.
        layout: 'users'
    }
</script>

<style scoped>
html, body {
    margin: 0;
}
</style>
