<template>
<v-app :dark="dark" :white="!dark">
  <v-navigation-drawer
    fixed
    clipped
    temporary
    v-model="drawer"
    app>
    <v-list dense>
        <v-list-tile key="커피한잔?" to="/">
          <v-list-tile-action><v-icon>free_breakfast</v-icon></v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>
                  커피한잔 해야겠다.  
                </v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile key="About" to="/about">
          <v-list-tile-action><v-icon>free_breakfast</v-icon></v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>
                  About  
                </v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar 
      color="blue"
      dense
      fixed
      clipped-left
      app>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title class="mr-9 align-right">
        <span class="title">그냥 저냥 산다.</span>
        <span class="title">그냥 저냥 산다.</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn icon
        @click="dark=!dark">
        <v-icon>toggle_off</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <v-content>
    <nuxt/>
  </v-content> 
  <v-btn
      fab
      bottom
      right
      color="pink"
      fixed
      @click="is_popup = !is_popup"
    >
      <v-icon>add</v-icon>
  </v-btn>
  <ContactDialog :is_popup="is_popup"></ContactDialog>
  <v-footer app>
    <span>시스템보안파트</span>
  </v-footer>
</v-app>
</template>

<script>
import ContactDialog from '@/components/Dialog/ContactDialog.vue'
import TheHeader from '@/components/Navigation/TheHeader.vue';
import TheSidenav from '@/components/Navigation/TheSidenav.vue';
import Header from '@/components/Nav/Header.vue';

export default {
  components: {
    TheHeader,
    TheSidenav,
    Header,    
    ContactDialog,
  },
  data: () => ({
    drawer: false,
    dark: true,
    is_popup: true,
  }),
}
</script>


<style>
html, body {
  font-family: 'Open Sans', sans-serif;
  padding: 0px;
  margin: 0px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}
/*
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}*/
</style>
