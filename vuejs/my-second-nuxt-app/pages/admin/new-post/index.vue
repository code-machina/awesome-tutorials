<template>
  <v-container>
    <v-layout xs12 justify-center>
      <v-flex xs7>
        <AdminPostForm />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm';
export default {
  components: {
    AdminPostForm,
  },
}
</script>

