<template>
  <v-container>
    <v-layout xs12 justify-center>
      <v-flex xs6>
        <AdminLoginForm />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AdminLoginForm from '@/components/Admin/AdminLoginForm';

export default {
  components: {
    AdminLoginForm,
  }  
}
</script>
