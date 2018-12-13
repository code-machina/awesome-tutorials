<template>
  <v-app white>
    <v-navigation-drawer fixed clipped temporary v-model="is_drawer" app>
      <v-list dense>
        <v-list-tile to="/about" key="about">
          <v-list-tile-action><v-icon>free_breakfast</v-icon></v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              About
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue" dense fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="is_drawer = !is_drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
          <span class="title">Yes24.com</span>
      </v-toolbar-title>
      <v-toolbar-items>
        <nuxt-link to="/about">
          <span class="title">About</span>
        </nuxt-link>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <nuxt/>
    </v-content>
    <v-footer app>
      <span> 시스템보안파트 </span>
    </v-footer>
  </v-app>
  <!--
   <nav class="navbar navbar-expand-lg navbar-dark">
          <div class="container">
              <nuxt-link to="/">
                  <div class="navbar-brand">
                      <i class="fa fa-code" aria-hidden="true"></i>
                      Yes24VueNuxt
                  </div>
              </nuxt-link>

              <div class="navbar-collapse">
                  <ul class="navbar-nav mr-auto">
                      <li class="nav-item">
                          <nuxt-link class="nav-link" to="/about">About</nuxt-link>
                      </li>
                      <li class="nav-item">
                          <nuxt-link class="nav-link" to="/contact">Contact</nuxt-link>
                      </li>
                      <li class="nav-item">
                          <nuxt-link class="nav-link" to="/posts/1">Post 1</nuxt-link>
                      </li>
                      <li class="nav-item">
                          <nuxt-link class="nav-link" to="/posts/2">Post 2</nuxt-link>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>

      <div id="content" class="container">
          <nuxt/>
      </div>

      <div id="footer" style="text-align:center; position:absolute; bottom:50px; width:100%;">
          <h4>
              <img src="../static/img/logo.svg" style="width:32px;margin-right:10px" />
              <a href="https://servicestack.net/vs-templates/vue-nuxt">Learn about this Vue Nuxt.js VS.NET template</a>
          </h4>
          <div>Copyright &copy; 2018</div>
      </div>

  -->
</template>

<script>
  export default {
    data: () => ({ 
      is_drawer: false,
    }),
  }
</script>
