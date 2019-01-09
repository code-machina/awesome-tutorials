<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3 offset-xs4>
      <PostList  :loadedPost="loadedPost"/>
    </v-flex>
  </v-layout>
</template>

<script>
import PostList from "@/components/Posts/PostList";

export default {
  components: {
    PostList
  },
  
};
</script>


<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>

