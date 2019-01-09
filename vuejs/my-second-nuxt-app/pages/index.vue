<template>
    <v-layout>
    <v-flex xs12 sm6 offset-sm3 offset-xs4>
      <PostList :loadedPost="loadedPost" />
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import PostPreview from '@/components/Posts/PostPreview.vue';
import PostList from '@/components/Posts/PostList.vue';

export default {
  components: {
    Logo,
    PostPreview,
    PostList
  },
  middleware: 'log',
  // asyncData(context){
  // fetch(context){
    // 아래의 방식은 이상적인 방법은 아니다. 중복 초기화를 막기 위해서는 nuxtServerInit 이 필요하다.
    // if (context.store.state.loadedPost.length > 0) {
    //  return null;
    // }
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       // console.log(context);
  //       resolve({
  //         loadedPost : [
  //           {
  //             id: '1',
  //             thumbnail: 'https://cdn.static-economist.com/sites/default/files/images/2015/09/blogs/economist-explains/code2.png',
  //             title: 'My first post',
  //             previewText: 'This my first post!'
  //           },
  //           {
  //             id: '2',
  //             thumbnail: 'https://cdn.static-economist.com/sites/default/files/images/2015/09/blogs/economist-explains/code2.png',
  //             title: 'My second post',
  //             previewText: 'This my second post!'
  //           },
  //           {
  //             id: '3',
  //             thumbnail: 'https://cdn.static-economist.com/sites/default/files/images/2015/09/blogs/economist-explains/code2.png',
  //             title: 'My third post',
  //             previewText: 'This my third post!'
  //           },
  //         ]
  //       });
  //     }, 1500);
  //   }).then(data => {
  //     // return data;
  //     context.store.commit('setPosts', data.loadedPost);
  //   })
  //   .catch(e => {
  //     context.error(new Error())
  //   });

  // },
  computed: {
    loadedPost() {
      return this.$store.getters.loadedPost;
    }
  }
  // created() {
  //  this.$store.dispatch('setPosts', this.loadedPost);
  //  console.log(this.$store.getters.loadedPost);
  // }
}
</script>

<style scoped>

.intro {
  height: 200px;
  /* relative:  */
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url('~assets/img/back.png');  
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
  text-align: center;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
    /* background-color: rgb(111,111,222); */
  }
}

/*
.featured-posts {
  display: inline-block;
  padding: 20px;
  box-sizing: border-box;

}
*/

.featured-posts {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

/* 모바일 화면에서 PostPreview 컴포넌트를 가운데로 정렬 */
@media only screen and (max-width: 1440px) {
  .featured-posts {
    display: grid;
    place-items: center center;
  }

  .home-page {
    width: 100%;
  }
}

</style>
