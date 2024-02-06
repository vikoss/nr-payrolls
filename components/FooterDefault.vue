<template>
  <v-footer class="d-flex flex-column">
    <div class="bg-teal d-flex w-100 align-center px-4">
      <strong>HAKU AGILE SOFTWARE!</strong>

      <v-spacer></v-spacer>

      <v-btn
        v-for="icon in [
          'mdi-facebook',
          'mdi-twitter',
          'mdi-linkedin',
          'mdi-instagram',
        ]"
        :key="icon"
        class="mx-4"
        :icon="icon"
        variant="plain"
        size="small"
      ></v-btn>
    </div>

    <div class="px-4 py-2 bg-black text-center w-100">
      {{ new Date().getFullYear() }} — <strong>HAKU</strong>
    </div>
  </v-footer>
</template>

<script>
export default {

}
</script>

<style>

</style>