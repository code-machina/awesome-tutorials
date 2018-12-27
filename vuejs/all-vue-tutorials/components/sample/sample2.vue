<template>
    <v-container fluid>
        <v-layout 
            align-center
            justify-center
            row
            fill-height
        >
            <v-flex sm6 column>
                <v-card>
                    <v-card-title class="headline">
                        Props 란? : 사용자 정보 예제
                    </v-card-title>
                    <v-card-text>
                        <p>
                            하위 컴포넌트에 데이터를 전달 할 때에 props 를 정의하고 약속한다. 이를 통해 상위 컴포넌트는 하위 컴포넌트에 데이터를 전달 할 때, 어떠한 유형의 데이터를 전달할지를 알 수 있다. props 를 통해 String, int, callback 등을 전달할 수 있다.
                        </p>
                        <p>
                            또한, props 를 이용해 통신하는 방법은 아래의 그림과 같다.
                        </p>
                        <img src="~/static/comm.jpg" :style="imgStyle" alt="">
                        <div>
                            <br>
                            <div class="headline" v-on:mouseover="hoverDiv"> 예제: 사용자 정보</div>
                            <hr>
                            <div>
                            </div>
                            <codemirror v-model="code" :options="cmOption"></codemirror>
                             <local-codemirror ref="cmA"
                      :value="code2"
                      :options="cmOption"
                      @blur="onCmBlur($event)"
                      @focus="onCmFocus($event)"
                      @ready="onCmReady($event)">
		</local-codemirror>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import { codemirror } from 'vue-codemirror'

// require styles
import 'codemirror/lib/codemirror.css'

export default {
    data: () => ({
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
      imgStyle: {
          'max-width': "100%",
      },
      code2: "hellworodl",
      code: "hellworld2",
    cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        mode: 'text/javascript',
        theme: "monokai"
      },
    }),
    methods: {
        changeLorem: function() {
            this.lorem = "gura";
        },
        hoverDiv: function($event) {
            console.log($event);
            console.log($event.screenX);
            console.log($event.screenY);
        },
        readFile: function(){
            const reader = new FileReader();
        }
    },
    components: {
    	LocalCodemirror: codemirror
    },
}
</script>
