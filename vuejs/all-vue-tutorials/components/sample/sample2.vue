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
                        Props 란?
                    </v-card-title>
                    <v-card-text>
                        <p>
                            하위 컴포넌트에 데이터를 전달 할 때에 props 를 정의하고 약속한다. 이를 통해 상위 컴포넌트는 하위 컴포넌트에 데이터를 전달 할 때, 어떠한 유형의 데이터를 전달할지를 알 수 있다. props 를 통해 String, int, callback 등을 전달할 수 있다.
                        </p>
                        <v-btn @click="changeLorem">click</v-btn>
                        <p>
                            {{lorem}}
                        </p>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data: () => ({
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    }),
    methods: {
        changeLorem: function() {
            this.lorem = "gura";
        }
    }
}
</script>
