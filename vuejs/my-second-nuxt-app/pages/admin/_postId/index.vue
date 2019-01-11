<template>
  <v-container>
    <AdminPostForm :post="loadedPost" @submit="onSubmitted($event)"/>  
  </v-container>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm';
import axios from 'axios';

export default {
  components: {
    AdminPostForm,
  },
  middleware: ['log', 'auth', 'check-auth'],
  asyncData(context) {
    return axios.get(
      "https://my-posts-beta.firebaseio.com/posts/" + context.params.postId + ".json"
    )
    .then(res => {
      console.log(res);
      return {
        loadedPost: { ...res.data, id: context.params.postId }
      }
    })
    .catch(e => context.error())
  },
  methods: {
    onSubmitted(editedPost){
      // AdminPostForm 컴포넌트의 submit 이벤트를 통해 전달 받은 갱신된 데이터를 axios 모듈의 put 메서드 이용하여 
      // 원격 firebase 의 DB 에 업데이트한다.
      console.log(editedPost);
      this.$store.dispatch('editPost', editedPost).then(()=>{ this.$router.push('/admin')});
    }
  }
}
</script>

