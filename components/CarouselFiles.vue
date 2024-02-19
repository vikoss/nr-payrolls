<template>
  <div>
    <p class="text-center text-2xl my-1">
      {{ files[carousel]?.name }}
    </p>
    <v-carousel v-model="carousel">
      <v-carousel-item
        v-for="(file, index) in files"
        :key="index"
        :src="!file.src?.includes('.pdf') ? file.src : null"
      >
        <iframe
          v-if="file.src?.includes('.pdf')"
          :src="file.src"
          style="width:100%; height:700px;" frameborder="0"
        />
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  props: {
    files: {
      type: Array,
      default: () => ([
        /* {
          src: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          name: 'Example name'
        } */
      ])
    },
  },
  setup() {
    const carousel = ref(0)

    return { carousel }
  }
}
</script>
