<template>
  <!-- 
        목표 1. 레이아웃 정의

        Veutify 의 v-flex, v-layout, v-container 를 통해 원하는 Layout 을 정의하고 여기에 Component 를 적절히 배치해보자.

        |              유저 정보                |
        |   유저 디테일     |    유저 편집       |
        |          이벤트 전파 로그              |        

        목표 2. props 를 전달하고 이를 하위 컴포넌트가 적절히 반영하는 예를 만들어 보자.

        User 컴포넌트는 UserEdit 컴포넌트, UserDetail 컴포넌트를 포괄한다.

  -->
  <v-container fluid class="user-component" text-xs-center grid-list-md>
    <!--
            v-container 의 fluid props 를 설정함으로써 viewport breakpoints 를 제거할 수 있다고 한다.
            viewport breakpoints 를 찾아보니 브라우저의 widths 라고 한다.
            viewport breakpoints are browser dimensions (usually just widths) that set the active range of a given media query. 

            즉, fluid 는 전체 화면을 모두 사용함을 의미하는 것으로 보인다.

            text-xs-center : 모든 viewport 에서 텍스트를 중앙으로 정렬한다.
    -->
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <!-- 사용자 프로필 영역 
                        2 단 구조로 나누어 왼쪽에는 프로필 이미지, 
                        오른쪽에는 사용자 정보를 입력한다.
          -->
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <!-- 실제 사용자 정보 출력 공간 -->
              <v-flex xs12>
                <v-layout>
                  <v-flex xs5>
                    <v-img :src="pic" height="100px" contain></v-img>
                  </v-flex>
                  <v-flex xs7>
                    <!-- 사용자 정보 -->
                    <div>
                      <div class="headline">{{ username }}</div>
                      <div> {{ now - age }} 년도 출생 </div>
                      <div> 나이 : {{ age }} </div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <user-edit :name="username" :id="id" :age="age" :pic="pic" @updatePlease="changeNameInsteadOfChild($event._id, $event.newName)"></user-edit>
      </v-flex>
      <v-flex xs6>
        <user-detail></user-detail>
        <v-card>
          <v-card-text class="px-0" xs6>12</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// UserEdit, UserDetail 컴포넌트를 임포트
import UserEdit from '@/components/user/UserEdit.vue'
import UserDetail from '@/components/user/UserDetail.vue'
import { mapMutations } from 'vuex'

export default {
  // 사용할 컴포넌트를 여기에 선언
  components: {
    "user-edit": UserEdit,
    "user-detail": UserDetail
  },
  data: function() {
      var _now = new Date();
      console.log(_now.getFullYear());
      return {
          now: _now.getFullYear(),
      }
  },
  props: {
    username: {
      type: String,
      default: null
    },
    pic: {
      type: String
    },
    id: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    }
  },
  methods: {
      changeNameInsteadOfChild(_id, newName){

          this.$store.commit("user/updateName", {_id, newName})
      },
      ...mapMutations({
          updateName: 'user/updateName'
      }),
  }
}
</script>

<style scoped>
.user-component {
}
</style>
