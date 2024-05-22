<template>
  <header class="bg-white h-20 flex justify-center items-center shadow-md">
    <nuxt-link to="/">
      <img
        src="@/assets/images/anr.png"
        alt="logo"
        class="h-8 cursor-pointer"
      >
    </nuxt-link>
  </header>
  <main class="px-6 sm:px-16 py-12">
    <slot />
  </main>
</template>
