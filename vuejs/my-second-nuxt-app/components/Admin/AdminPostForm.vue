<template>
  <v-form @submit.prevent="submit">
    <v-text-field label="Author" v-model="editedPost.author"></v-text-field>
    <v-text-field label="Subject" v-model="editedPost.title"></v-text-field>
    <v-text-field label="Thumbnail" v-model="editedPost.thumb"></v-text-field>
    <v-divider></v-divider>
    <v-textarea v-model="editedPost.content" label="Message" counter maxlength="120" full-width single-line></v-textarea>
    <v-btn type="submit">제출</v-btn>
    <v-btn @click="cancel">취소</v-btn>
  </v-form>
</template>

<script>
export default {
  props:{
    post: {
      type: Object,
      required: false,
    }
  },
  data: function(){
    return {
      editedPost: this.post
        ? { ...this.post } 
        : { 
            author: '', 
            title: '', 
            thumb: '', 
            content: '' 
          },
    }

  },
  methods: {
    submit(){
      this.$emit('submit', this.editedPost);
    },
    cancel(){
      // this.$router.push({path: '/admin'});
      this.$router.go(-1);
    }
  }
}
</script>