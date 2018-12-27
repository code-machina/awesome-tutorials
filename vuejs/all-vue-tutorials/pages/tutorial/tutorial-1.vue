<template>
    <v-layout>
        <v-flex>
            <div class="text-xs-center"></div>
            <v-card>
                <v-card-title class="headline">
                    click.native 에 대한 연습
                </v-card-title>
                <v-card-text>
                    <p> 이 영역은 부모 컴포넌트의 통제를 받습니다.</p>
                    <p> dump-cmp 컴포넌트는 사용자 정의 컴포넌트이다. </p>
                    <p> 이 컴포넌트는 click 이벤트를 구현하지 않았다. </p>
                    <div class="text-xs-center">
                        <em> Interpolation(보간법) : {{ paragraph }} </em>
                    </div>
                    <v-btn @click="nativeClickEvent($event)">Click </v-btn>
                    <hr class="my-3">
                    <v-spacer/>
                    <p> 아래의 영역은 DumbCmp 영역입니다. </p>
                    <dumb-cmp @click.native="nativeClickEvent"></dumb-cmp>
                    <dumb-cmp @click.native="nativeClickEvent($event)"></dumb-cmp>
                </v-card-text>
            </v-card>        
        </v-flex>        
    </v-layout>
</template>
<script>
import DumbCmp from "@/components/tutorial-1/DumbCmp.vue";

export default {
    components: {
        DumbCmp
    },
    data: function() {
        return {
            paragraph: "변환될 데이터 입니다.",
        };
    },
    methods: {
        nativeClickEvent: function(){
            console.log("이벤트가 발생하였습니다. ");
            this.paragraph = "dumb-cmp 영역을 클릭하여 변환되었습니다.";
        },
    }
}
</script>

