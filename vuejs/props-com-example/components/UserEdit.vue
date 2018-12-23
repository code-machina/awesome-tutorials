<template>
<div class="component">
    <h3>You may edit the User Here</h3>
    <p>Edit me!</p>
    <p>User Age : {{ userAge }}</p>
    <v-btn @click="editAge">Edit Age</v-btn>
</div>    
</template>

<script>

import { eventBus } from '@/middleware/event';

export default {
    props: {
        userAge: {
            type: Number,
        }
    },
    methods:{
        editAge: function() {
            // this.age = 30;
            // this.$emit("age-was-edited", 30);
            // eventBus.$emit("age-was-edited-bus", 30)
            // eventBus 내에 정의한 메서드를 실행, 위와 동일한 코드
            // eventBus.changeAge(30);
            // nuxt 또한 동일한 기능을 제공
            this.$nuxt.$emit("age-was-edited-bus", 30)
        }
    }
}
</script>

<style scoped>

</style>


