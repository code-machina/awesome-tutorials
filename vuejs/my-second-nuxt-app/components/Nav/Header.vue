<template>
<!-- 
<div class="header-container">
    <header class="the-header">
        <div class="logo">
            <nuxt-link to="/">WD BLOG</nuxt-link>
        </div>
        <div class="spacer"></div>
        <div class="navigation-items">
            <ul class="nav-list">
                <li class="nav-items">
                    <nuxt-link to="/posts">Blog</nuxt-link>
                </li>
                <li class="nav-items">
                    <nuxt-link to="/about">About</nuxt-link>
                </li>
                <li class="nav-items">
                    <nuxt-link to="/admin">Admin</nuxt-link>
                </li>
            </ul>
        </div>
    </header>
</div>    
-->

<v-card-title class="blue white--text">
    <span class="headline">Menu</span>

    <v-spacer></v-spacer>

    <v-menu bottom left>
    <v-btn
        slot="activator"
        dark
        icon
    >
        <v-icon>more_vert</v-icon>
    </v-btn>
    
    <v-list>
        <v-list-tile
        v-for="(item, i) in items"
        :key="i"
        @click=""
        >
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
    </v-list>
    </v-menu>
</v-card-title>
</template>

<script>
import SideNavToggle from '@/components/Nav/SideNavToggle.vue'

export default {
    name: "Header",
    components: {
        SideNavToggle,
    },
    data: {
        return: {
            items : [
                {title: "good"}
            ],
        }
    }
}
</script>

<style scoped>
.header-container {
    height: 60px;
}

.the-header {
    width: 100%;
    background-color: yellow;
    height: 60px;
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 100;
    padding: 0 20px;
    box-sizing: border-box;
}
.logo {
    margin: 0 10px;
    font-size: 1.3rem;
}
.logo a {
    text-decoration: none;
    color: white;
}

.spacer {
    flex: 1;
}

.navigation-items {
    display: none;
}

@media (min-width: 768px) {
  .navigation-items {
    display: block;
  }
}

</style>
