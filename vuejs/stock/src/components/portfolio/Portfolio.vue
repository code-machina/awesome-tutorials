<template>
  <div class="d-flex flex-row flex-wrap">
    <app-stock v-for="stock in stocks" :stock="stock" :key="stock.id"></app-stock>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Stock from './Stock';
export default {
  computed: {
    ...mapGetters({
      stocks: 'stockPortfolio',
    }),
  },
  components: {
    appStock: Stock,
  }
}
</script>
