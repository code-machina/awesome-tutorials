<template>
  
    <!-- 
    <div class="post-preview">
      <div 
        class="post-thumbnail" 
        :style="{backgroundImage: 'url(' + thumbnail + ')'}"></div>
      <div class="post-content">
        <h1> {{ title }} </h1>
        <p> {{ previewText }} </p>
      </div>
    </div>
    -->
    <v-flex xs12>
      <v-card color="red" class="white--text">
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title primary-title>
              <div>
                <div class="headline"> {{ title }} </div>
              </div>
            </v-card-title>
            <v-card-text>
              <div> {{ previewText }} </div>
            </v-card-text>
          </v-flex>
          <v-flex xs12>
            <v-img :src="thumbnail" height="125px" contain></v-img>
          </v-flex>
        </v-layout>
        <v-divider light></v-divider>
        <v-card-actions class="pa-3">
          <v-layout row wrap>
            <v-flex xs12>
              <span>Rate this Posts</span>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
            </v-flex>
            <v-flex xs12 justify-end>
              <nuxt-link :to="postLink">
                <v-btn color="orange" class="white--text">See</v-btn>
              </nuxt-link>
            </v-flex>
          </v-layout>
          
        </v-card-actions>
      </v-card>
    </v-flex>
</template>

<script>
export default {
  name: "PostPreview",
  computed: {
    postLink(){
      return this.isAdmin ? '/admin/' + this.id : '/posts/'  + this.id;
    }
  },
  props: {
    isAdmin: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    previewText: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    }
  }
};
</script>


<style scoped>
.post-preview {
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  width: 300px;
  margin: 10px auto;
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}

.post-content {
  padding: 10px;
  text-align: center;
}

a:hover .post-content,
a:active .post-content {
  background-color: #ccc;
}
</style>

