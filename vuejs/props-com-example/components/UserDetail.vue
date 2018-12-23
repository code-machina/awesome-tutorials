<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many details</p>
        <p>User name : {{ myName }}</p>
        <p>Switched User name : {{ switchName() }}</p>
        <p>User age : {{ userAge }}</p>
        <p>(Event Bus) age : {{ age }}</p>
        <v-btn @click="resetName">Reset Name</v-btn>
        <v-btn @click="resetFn()">Reset Name using callback</v-btn>
    </div>
</template>

<script>
import { eventBus } from '@/middleware/event';

export default {
    // props 는 UserDetail 컴포넌트를 사용할 때 전달할 프로퍼티를 명시적으로 선언
    // props: [
    //     'MyName', 
    // ],
    // props 의 유효성 검증
    props: {
        myName: {
            type: String,
        }, // myName props 는 항상 문자열을 수신한다.
        resetFn: {
            type: Function,
        },
        userAge: {
            type: Number,
        }
    },
    data: function() {
        return {
            myNameData: this.myName,
            age: this.userAge,
        };
    },
    methods: {
        switchName: function() {
            // console.log(this.myName)
            return (this.myName || "").split("").reverse().join("");
        },
        resetName: function() {
            // this.myNameData = "구라";
            // $ : built-in method
            // arg1: event Name
            // arg2: data
            this.$emit('name-was-reset', "구라"); 
        }
    },
    // hook: created 에 대한 내용을 볼필요가 있지 않을까? 
    created: function() {
        /*
        eventBus.$on('age-was-edited-bus', (payload) => {
            this.age = payload;
        });
        */
       // nuxt 또한 eventBus 를 자체적으로 제공한다. 매우 쉽다.
       // 그러나 코드의 중앙 집중화는?
       this.$nuxt.$on('age-was-edited-bus', (payload) => {
            this.age = payload;
        });
    },
}
</script>

<style scoped>

</style>

