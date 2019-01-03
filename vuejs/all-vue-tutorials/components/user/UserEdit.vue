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
                    <!-- 비동기 관련 내용 -->
                    <v-expansion-panel>
                        <v-expansion-panel-content key="1">
                            <div slot="header">비동기 이름 수정 예시</div>
                            <v-card class="px-2">
                                <v-text-field
                                    label="Duration"
                                    :value="duration"
                                    clearable
                                ></v-text-field>
                                <v-text-field
                                    label="async 이름 편집"
                                    v-model="newName"
                                    @keyup.enter="asyncUpdateName({_id: id, newName: newName, duration: duration})"
                                    clearable
                                ></v-text-field>
                            
                            </v-card>
                        </v-expansion-panel-content>
                        <v-expansion-panel-content key="2">
                            <div slot="header">v-model two-way binding state</div>
                            <v-card class="px-2">
                                <v-text-field
                                    label="The Value"
                                    v-model="value"
                                >
                                </v-text-field>
                                <div>
                                    Watching the change of "value".
                                </div>
                                <div>
                                    {{ value }}
                                </div>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    
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
import { mapActions, mapMutations } from 'vuex'
// import * as types from '@/store/user-mutations-types';

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
        },
        value: {
            // 아래와 같이 get 과 set 을 정의함으로써 
            // v-model 에 데이터를 바인딩하여 양방향 바인딩을 구현할 수 있음.
            // v-model="value" 와 같이 작성한다.
            get() {
                return this.$store.getters['user/value'];
            },
            set(value) {
                this.$store.dispatch("user/updateValue", value)
            }
        }
    },
    data: () => ({
        duration: 2000, // 2 초,
        newName: "", // 새로운 이름
    }),
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
                // this.$store.commit(types.UPDATE_NAME, { _id, newName } )
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
        }),
        ...mapActions({
            asyncUpdateName : 'user/asyncSetNewName'
        })
    }
}
</script>

