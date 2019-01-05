<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">잘못된 페이지 입니다.</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">홈페이지로 이동하기</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  // layout: 'default' // you can set a custom layout for the error page
}
</script>