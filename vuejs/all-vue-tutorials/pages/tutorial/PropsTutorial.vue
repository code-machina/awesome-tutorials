<template>
    <div>
        <div v-for="user in users" :key="user.id">
            <app-user-sample :username="user.username" :pic="user.pic" :id="user.id" :age="user.age"/>
        </div>
    </div>
</template>


<script>
import User from "@/components/user/User.vue";
import { mapMutations, mapGetters, mapState } from 'vuex'

export default {
    components: {
        'app-user-sample': User,
    },
    computed: mapGetters({
            users: 'user/users'
    }),
    
    /*
    data: () => ({
        users: [
            {id: 1, username: "행운의 사나이", pic: "https://randomuser.me/api/portraits/lego/1.jpg"},
            {id: 2, username: "기쁨의 사나이", pic: "https://randomuser.me/api/portraits/lego/2.jpg"},
            {id: 3, username: "눈물의 사나이", pic: "https://randomuser.me/api/portraits/lego/3.jpg"},
        ]
    })*/

}
</script>

<style scoped>

</style>


