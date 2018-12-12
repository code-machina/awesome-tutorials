<template>
  <nuxt-link :to="'posts/' + id">
    <div class="post-preview">
      <div 
        class="post-thumbnail" 
        :style="{backgroundImage: 'url(' + thumbnail + ')'}"></div>
      <div class="post-content">
        <h1> {{ title }} </h1>
        <p> {{ previewText }} </p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
    name: 'PostPreview',
    props: {
        id: {
            type: String,
            required: true,
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
}
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

