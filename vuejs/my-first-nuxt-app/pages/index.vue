<template>
  <section class="container">
    <div>
      <Header />
      <nuxt-link to="/users">Users</nuxt-link><br/>
      <button @click="onNavigateToProducts"> Go to Products </button>
      <button @click="$router.push('/products')"> Go to Products </button>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue';
export default {
  components: {
    Logo,
    // Header
  },
  methods: {
    onNavigateToProducts () {
       this.$router.push('/products');
    },
  }
}
</script>