<template>
  <v-container>
    <AdminPostForm :post="loadedPost"/>  
  </v-container>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm';

export default {
  components: {
    AdminPostForm,
  },
  data(){
    return {
      loadedPost: {
        author: 'gbkim',
        title: 'Title is title',
        content: 'Content is content',
        thumb: 'https://cdn.static-economist.com/sites/default/files/images/2015/09/blogs/economist-explains/code2.png'
      },
    }
  }
}
</script>

