<template>
  <div class="text-center">
    <v-dialog
      v-model="loading"
      :scrim="false"
      persistent
      width="auto"
    >
      <v-card
        color="primary"
      >
        <v-card-text>
          Por favor espere
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return {
      loading: computed(() => props.show)
    }
  }
}
</script>
