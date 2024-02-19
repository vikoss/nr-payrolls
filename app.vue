<template>
  <nuxt-layout :name="authenticated ? 'default' : 'login'">
    <nuxt-page />
  </nuxt-layout>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const { authenticated } = storeToRefs(useAuthStore())

    return { authenticated }
  }
}
</script>
