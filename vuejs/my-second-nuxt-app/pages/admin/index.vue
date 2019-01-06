<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <div>
          Here is a headline 
          <h1> Create New Post</h1>
          <v-btn color="green" class="white--text" to="/admin/new-post">Create Post</v-btn>
        </div>
      </v-flex>
      <v-flex xs12>
        <div>
          <h1> This is Post List</h1>
          <PostList isAdmin />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PostList from '@/components/Posts/PostList';

export default {
  components: {
    PostList
  }  
}
</script>

