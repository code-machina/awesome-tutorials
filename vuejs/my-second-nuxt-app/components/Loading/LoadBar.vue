<template>
     <v-container grid-list-xl text-xs-center>
    <v-layout column align-center>
      <v-flex xs10 offset-xs1>
       <v-avatar
          :size="135"
          color="grey lighten-4"
          class="ma-5"
        >
          <img src="https://goo.gl/TxjkGP" alt="" >
        </v-avatar>
        <blockquote>
          Loading data ...
          <footer>
            <v-progress-linear :indeterminate="true"></v-progress-linear>
          </footer>
        </blockquote>
      </v-flex>
      </v-layout>
    </v-container>
</template>
