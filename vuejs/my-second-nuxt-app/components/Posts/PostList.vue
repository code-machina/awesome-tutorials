<template>
   <v-container v-bind="{ [`grid-list-xs`]: true }">
    <v-layout 
    row 
    wrap
    >
      <v-flex xs4>
        <PostPreview
        id="1"
        :is-admin="isAdmin"
        thumbnail="https://cdn.static-economist.com/sites/default/files/images/2015/09/blogs/economist-explains/code2.png"
        title="Hello there!"
        previewText="This my first post!"
        />
      </v-flex>
      <v-flex xs4>
        <PostPreview
        id="2"
        :is-admin="isAdmin"
        thumbnail="https://cdn.static-economist.com/sites/default/files/images/2015/09/blogs/economist-explains/code2.png"
        title="Hello there!"
        previewText="This my first post!"
        />
      </v-flex>
      <v-flex xs4>
        <PostPreview
        id="2"
        :is-admin="isAdmin"
        thumbnail="https://cdn.static-economist.com/sites/default/files/images/2015/09/blogs/economist-explains/code2.png"
        title="Hello there!"
        previewText="This my first post!"
        />
      </v-flex>
      <v-flex xs4>
        <PostPreview
        id="2"
        :is-admin="isAdmin"
        thumbnail="https://cdn.static-economist.com/sites/default/files/images/2015/09/blogs/economist-explains/code2.png"
        title="Hello there!"
        previewText="This my first post!"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview';

export default {
  components: {
    PostPreview,
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    }
  }
}
</script>
