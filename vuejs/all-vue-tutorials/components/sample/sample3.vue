<template>
  <v-container fluid>
    <v-layout align-center justify-center row fill-height>
      <v-flex sm6 column>
        <v-card>
          <v-card-title class="headline">v-on 이벤트 정리</v-card-title>
          <v-card-text>
            <p>
              <a href="https://kr.vuejs.org/v2/guide/events.html">참고 자료</a>
            </p>
            <ul>
              <li>v-on:mouseover</li>
              <li>v-on:ctrl</li>
              <li>v-on:keyup</li>
              <li>v-on:click</li>
              <li>v-on:submit</li>
            </ul>
            <br>
            <hr>
            <br>
            <div class="headline">이벤트 예시</div>
            <br>
            <p>특정 영역에 마우스를 올리면 이벤트가 발생한다.</p>
            <p>이벤트 메시지 :
              <strong>{{ msg }}</strong>
            </p>
            <div :style="divsStyle" @mouseover="mouseOver">
              마우스를 올려보세요.
              이 div 태그는 가로 200px, 세로 120px 입니다.
            </div>
            <div :style="divsStyle" @click.ctrl="shortcutPress">
              마우스를 올려보세요.
              이 div 태그는 가로 200px, 세로 120px 입니다.
            </div>
            <div :style="divsStyle" @click.ctrl.exact="shortcutExact">
              마우스를 올려보세요.
              이 div 태그는 가로 200px, 세로 120px 입니다.
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    data: () => ({
        msg: "이벤트가 없습니다.", 
        divsStyle:{
            width: "200px",
            height: "100px",
            border: "1px solid black",
            margin: "5 5 5 5",
        },
    }),
    methods: {
        mouseOver: function() {
            this.msg = "마우스를 올렸군요 :)";
        },
        shortcutPress: function(){
            this.msg = "ctrl 키를 누른 상태에서 클릭하셨군요 :)";
        },
        shortcutExact: function(){
            this.msg = "정확히 ctrl 키를 누른 상태에서 클릭하셨군요 :)";
        }
    }
}
</script>
