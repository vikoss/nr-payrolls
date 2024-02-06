<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-app-bar-title>HAKU</v-app-bar-title>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer">
    <v-list-item title="HAKU" subtitle="Agile Software"></v-list-item>
    <v-divider></v-divider>
    <v-list-item link title="Opcion 1"></v-list-item>
    <v-list-item link title="Opcion 2"></v-list-item>
    <v-list-item link title="Opcion 3"></v-list-item>
  </v-navigation-drawer>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
    }),
  }
</script>
