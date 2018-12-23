/*
    Event Bus
    methods 를 아래와 같이 작성하여 코드를 집중시킬 수 있음.
*/
import Vue from 'vue'

export const eventBus = new Vue({
    methods:{
        changeAge: function(age){
            this.$emit('age-was-edited-bus', age);
        }
    }
});