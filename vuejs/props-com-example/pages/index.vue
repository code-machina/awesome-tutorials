<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>
      <app-user></app-user>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import User from '@/components/User.vue';

export default {
  components: {
    Logo,
    VuetifyLogo,
    'app-user': User,
  }
}
</script>
