<template>
  <v-container  align-center justify-center row fill-height>
    <v-flex sm6>
      <div class="text-xs-center"></div>
      <v-card>
        <v-card-title class="headline">click.native 이란?</v-card-title>
        <v-card-text>
          <p>컴포넌트의 루트 엘리먼트에 네이티브 이벤트를 수신할 경우 사용하는 옵션입니다. 일반적으로 사용자 정의 컴포넌트에 대해 click 
              이벤트를 발생시키고자 한다면 &lt;custom-event @click="clickEvent" /&gt; 를 떠올릴 것입니다. 이는 컴포넌트 전체에 대한 click 
              이벤트를 정의하는 것을 목적으로 할 것입니다. 그러나 일반적으로 이 구현은 적용되지 않습니다. 이는 custom-event 컴포넌트가 click 
              에 대응하는 이벤트를 구현하지 않았기 때문입니다. 그렇다면 어떻게 click 이벤트를 적용할까요?</p>
          <p>정답은 click.native 어트리뷰트입니다. click.native 를 통해서 아래와 같이 구현할 수 있습니다.</p>
          <code-view>
&lt;dumb-cmp @click.native=&quot;nativeClickEvent&quot;&gt;&lt;/dumb-cmp&gt;
&lt;dumb-cmp @click.native=&quot;nativeClickEvent($event)&quot;&gt;&lt;/dumb-cmp&gt;
          </code-view>
          <hr>
          <br>
          <p class="text-xs-center"> 
            <em>dump-cmp</em> 컴포넌트는 사용자 정의 컴포넌트입니다. 이 컴포넌트의 전체 영역에 click 이벤트를 적용하여 컴포넌트를 클릭 시 
            현재 컴포넌트의 텍스트 데이터를 변경하도록 하겠습니다.
          </p>
          <div class="text-xs-center">
            <em> 텍스트 데이터 : {{ paragraph }}</em>
          </div>
          <v-btn @click="resetEvent">리셋</v-btn>
          <hr class="my-3">
          <v-spacer/>
          <p>아래의 영역은 DumbCmp 영역입니다.</p>
          <dumb-cmp @click.native="nativeClickEvent($event)"></dumb-cmp>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
import DumbCmp from '@/components/tutorial-1/DumbCmp.vue'
import CodeView from '@/components/code/CodeView.vue'
export default {
  components: {
    DumbCmp,
    CodeView
  },
  data: function() {
    return {
      paragraph: '변환될 데이터 영역입니다.'
    }
  },
  methods: {
    nativeClickEvent: function(event) {
      console.log('이벤트가 발생하였습니다. ')
      console.log(event);
      this.paragraph = event;
    },
    resetEvent: function(){
        this.paragraph = "변환될 데이터 영역입니다.";
    }
  }
}
</script>

