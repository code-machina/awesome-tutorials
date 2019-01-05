<template>
    <div class="col-sm-6 col-md-4">
        <div class="card border-success mb-3">
            <div class="card-header bg-transparent border-success">
                    {{ stock.name }}
                    <small>{Price: {{ stock.price }} | Quantity: {{ stock.quantity }}}</small>
            </div>
            <div class="card-body text-success d-flex flex-row">
                <div>
                    <input type="number"
                        class="form-control"
                        v-model="quantity"
                        placeholder="Quantity">
                </div>
                <div class="px-4">
                    <button class="btn btn-success"
                      @click="sellStock({ stockId: stock.id , quantity, stockPrice: stock.price })"
                      :disabled="quantity <= 0">
                        Sell
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['stock'],
  data: () => ({
    quantity: 0,
  }),
  methods: {
      /*
    sellStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity,
      };
      this.$store.dispatch('sellStock', order);
      this.quantity = 0;
    },*/
    ...mapActions([
        'sellStock'
    ]),
  },
};
</script>
