<template>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
<v-list>
    
    <v-list-tile
        v-for="(item, i) in items"
        :to="item.to"
        :key="i"
        router
        exact
    >
        <v-list-tile-action>
        <v-icon v-html="item.icon" />
        </v-list-tile-action>
        <v-list-tile-content>
        <v-list-tile-title v-text="item.title" />
        </v-list-tile-content>
    </v-list-tile>
</v-list>
    </v-navigation-drawer>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>

