<template>
  <v-container>
    <v-layout xs12 justify-center>
      <v-flex xs7>
        <AdminPostForm @submit="onSubmitted($event)"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm';

export default {
  components: {
    AdminPostForm,
  },
  methods: {
    onSubmitted(postData) {
      // nuxt.config.js 에 등록한 axios 모듈에 접근 테스트
      // console.log(this.$axios);
      this.$axios.post('https://my-posts-beta.firebaseio.com/posts.json', postData)
      .then(
        result => console.log(result)
      )
      .catch(e => console.log(e))
    }
  }
}
</script>

