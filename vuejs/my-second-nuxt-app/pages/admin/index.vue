<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <div>
          Here is a headline 
          <h1> Create New Post</h1>
          <v-btn color="green" class="white--text" to="/admin/new-post">Create Post</v-btn>
          <v-btn color="red" class="white--text" @click="onLogout">Logout</v-btn>
        </div>
      </v-flex>
      <v-flex xs12>
        <div>
          <h1> This is Post List</h1>
          <PostList 
          isAdmin 
          :loadedPost="loadedPost"/>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PostList from '@/components/Posts/PostList';

export default {
  middleware: ['log', 'auth', 'check-auth'],
  components: {
    PostList
  },
  computed:{
    loadedPost(){ return this.$store.getters.loadedPost; }
  },
  methods:{
    onLogout(){
      this.$store.dispatch('logout');
      this.$router.push('/admin/auth')
    }
  }
  // Getter 를 사용하는 것이 훨씬 나아보인다.
  /* asyncData(context){
    context.$axios.get('https://my-posts-beta.firebaseio.com/posts.json').then(
      res => {

        return {
          loadedPost: 
        }
      }
    )
  } */
}
</script>

