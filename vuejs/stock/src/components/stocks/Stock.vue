<template>
    <div class="col-sm-6 col-md-4">
        <div class="card border-success mb-3">
            <div class="card-header bg-transparent border-success">
                    {{ stock.name }}
                    <small>{Price: {{ stock.price }}}</small>
            </div>
            <div class="card-body text-success d-flex flex-row">
                <div>
                    <input type="number"
                        class="form-control"
                        v-model="quantity"
                        placeholder="Quantity">
                </div>
                <div class="px-4">
                    <button :class="{'btn': true, 'btn-success': !insufficientFunds, 'btn-danger': insufficientFunds }"
                      @click="buyStock"
                      :disabled="(insufficientFunds || quantity <= 0)">
                        {{ insufficientFunds ? "불가" : "구매" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['stock'],
  data: () => ({
    quantity: 0,
  }),
  computed: {
    insufficientFunds() {
      return this.quantity * this.stock.price > this.$store.getters.funds;
    },
  },
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity,
      };
      console.log(order);
      this.$store.dispatch('buyStock', order);
      this.quantity = 0;
    },
  },
};
</script>
