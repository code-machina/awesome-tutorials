<template>
    <div class="component">
        <h1>The User Component</h1>
        <p>I'm an awesome User!</p>
        <v-btn round color="primary" @click="changeName" >Change My Name</v-btn>
        <p>My Name is {{ name }}</p>
        <hr>
        <div class="row">
            <div>
                <app-user-detail 
                    v-bind:myName="name" 
                    v-on:name-was-reset="name = $event"
                    :resetFn="resetName"
                    :userAge="age"></app-user-detail>
            </div>
            <div class="col-xs-12 col-sm-12">
                <app-user-edit :userAge="age" v-on:age-was-edited="age = $event"></app-user-edit>
            </div> 
        </div>
    </div>
</template>

<script>
import UserDetail from './UserDetail.vue';
import UserEdit from './UserEdit.vue';


export default {
    data: function() {
        return {
            name: '건범',
            age: 20,
        };
    },
    methods: {
        changeName: function($event){
            this.name = "건범";
        },
        resetName: function(){
            this.name = "콘봄";
        }
    },
    // Register imported components here
    components: {
        // This is Kebab style
        // 'app-user-detail': UserDetail,
        // This is cambelCase Style
        appUserDetail: UserDetail,
        'app-user-edit': UserEdit,
    }
}
</script>

