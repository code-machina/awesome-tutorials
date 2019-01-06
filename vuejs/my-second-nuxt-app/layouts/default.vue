<template>
<v-app id="inspire" :dark="dark" :white="!dark">
  <v-navigation-drawer
    fixed
    clipped
    temporary
    color="primary"
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
      color="red"
      dense
      fixed
      clipped-left
      app>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title class="mr-9 align-center white--text">
        <span class="title"> Just Live </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat to="/posts" color="white"> Posts </v-btn>
      <v-btn flat to="/about" color="white"> About </v-btn>
      <v-btn flat to="/admin" color="white"> Admin </v-btn>
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
      @click="openPopup"
    >
      <v-icon>add</v-icon>
  </v-btn>
  <!-- 
  <ContactDialog v-if="is_popup" :is_popup="is_popup" @cancel-contact="is_popup = false" @confirm-contact="is_popup = false"></ContactDialog>
  -->
  <v-footer app color="red">
    <span class="white--text">@2019 시스템보안파트</span>
  </v-footer>
</v-app>
</template>

<script>
import ContactDialog from '@/components/Dialog/ContactDialog.vue';
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
    dark: false,
    is_popup: false,
  }),
  methods: {
    openPopup(){
      if(this.is_popup){
        this.is_popup = false;
        this.is_popup = true;
      }
      else {
        this.is_popup = true;
      }
      
    }
  }
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
</style>
