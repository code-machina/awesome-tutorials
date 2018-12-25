<template>
    <div>
        <p>Counter: {{ counter }}</p>
        <v-btn @click="increment">Increment</v-btn>
        <v-btn @click="decrement">Decrement</v-btn>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';

export default {
    computed: {
        counter: function() {
            return this.$store.getters.doubleCounter;
        }
    },
    methods: {
        ...mapMutations([
            'increment',
            'decrement',
        ]),
        increment(){
            this.$store.state.counter++;
            this.$store.commit('increment');
        },
        decrement(){
            this.$store.state.counter--;
            this.$store.commit('decrement');
        }
    }
}
</script>

