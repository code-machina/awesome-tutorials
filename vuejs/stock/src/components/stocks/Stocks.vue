<template>
    <div class="container-fluid">
        <h1>The Stacks Component</h1>
        <div class="d-flex flex-row flex-wrap">
          <app-stock
            v-for="stock in stocks"
            :key="stock.id"
            :stock="stock"></app-stock>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Stock from './Stock';

export default {
  components: {
    appStock: Stock,
  },
  computed: {
    ...mapGetters([
      'stocks',
    ]),
  },
};
</script>
