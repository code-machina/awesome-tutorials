<template>
    <v-card>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-title>
                        사용자 정보 편집 화면
                    </v-card-title>
                    <v-text-field
                        label="displayName"
                        :value="displayName"
                        readonly
                        >
                    </v-text-field>
                    <v-text-field
                        label="edit Name"
                        @keyup.enter="editName"
                        clearable
                    ></v-text-field>
                    <v-text-field
                        label="displayAge"
                        :value="displayAge"
                        readonly
                        >
                    </v-text-field>
                    <v-text-field
                        label="edit Age"
                        @keyup.enter="editAge"
                        clearable
                    ></v-text-field>
                    <v-text-field
                        label="display Pic Url"
                        :value="displayPicUrl"
                        readonly
                        >
                    </v-text-field>
                    <v-text-field
                        label="edit Pic Url"
                        @keyup.enter="editPicUrl"
                        clearable
                    ></v-text-field>
                    <v-card-text>
                        <div class="text-xs-left"> 
                            우리는 편집 호출을 양도할 수 있다. 
                            아래의 버튼을 클릭하면(@click) 부모 컴포넌트가 대신 이름을 변경할 것이다. 
                        </div>
                        <v-btn @click="delegateChangeName">부모에게 요청</v-btn>
                    </v-card-text>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    props:{
        name : {
            type: String
        },
        age : {
            type: Number,
            default: null
        },
        id : {
            type: Number,
            required: true
        },
        pic : {
            type: String,
            required: true
        }
    },
    computed: {
        displayName : function(){
            return this.name;
        },
        displayAge : function() {
            return this.age;
        },
        displayPicUrl : function() {
            return this.pic;
        }
    },
    methods: {
        delegateChangeName(){
            this.$emit("updatePlease", { _id: this.id, newName: "부모가 바꾸는 state!" } )
        },
        editName(e){
            // 이벤트로 부터 text 값을 얻어옴
            // console.log(e);
            const newName = e.target.value;
            if(newName.trim()){
                const _id = this.id;
                this.$store.commit('user/updateName', { _id, newName } )
            }
            // e.target.value = ""; // 빈 값으로 변경
        },
        editAge(e){
            const newAge = parseInt(e.target.value);
            if(typeof newAge == 'number' && newAge > 0){
                const _id = this.id;
                this.$store.commit('user/updateAge', { _id, newAge } )
            }
            // e.target.value = ""; // 빈 값으로 변경
        },
        editPicUrl(e){
            const newUrl = e.target.value;
            console.log(newUrl);
            if(newUrl.trim()){
                const _id = this.id;
                this.$store.commit('user/updatePic', { _id, newUrl } )
            }
        },
        ...mapMutations({
            updateName: 'user/updateName'
        })
    }
}
</script>

