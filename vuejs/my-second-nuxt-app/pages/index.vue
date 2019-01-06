<template>
  <v-layout 
    column
    justify-center
    align-center
  >
      <v-flex>
      </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import PostPreview from '@/components/Posts/PostPreview.vue';

export default {
  components: {
    Logo,
    PostPreview
  }
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
