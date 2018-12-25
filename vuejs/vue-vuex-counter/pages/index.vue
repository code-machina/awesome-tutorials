<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>
      <div class="text-xs-center">
      </div>
      <v-card>
        <counter></counter>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Counter from "@/components/Counter.vue";

export default {
  components: {
    Counter,
  }
}
</script>
