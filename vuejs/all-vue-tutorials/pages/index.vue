<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs6>
      <div class="text-xs-center">
        
      </div>
      <v-card>
        <v-card-title class="headline">Vue 에 대한 모든 Tutorial 입니다.</v-card-title>
        <v-card-text>
          <p> Vue, Vuetify, Nuxt, Axios, Express 에 대한 튜토리얼을 제공합니다. </p>
          <p> 버그가 있다구요? 알려주세요 :) 
          <a
            href="https://github.com/code-machina/awesome-tutorials/issues"
            target="_blank"
            title="contribute">issue board</a>.</p>
          <div class="text-xs-right">
            <em><small>&mdash; Code Machina (gbkim1988@gmail.com)</small></em>
          </div>
          <hr class="my-3">
          <a
            href="https://code-machina.github.io/"
            target="_blank">My Homepage</a>
          <br>
          <a
            href="https://github.com/code-machina"
            target="_blank">code-machina GitHub</a>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            flat
            nuxt
            to="/tutorial">시작하기</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  components: {
  }
}
</script>
