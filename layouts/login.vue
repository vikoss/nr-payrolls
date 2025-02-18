<template>
  <div class="flex flex-wrap min-h-screen">
    <div class="flex-grow py-7 px-6 sm:px-12 bg-wine h-full lg:h-auto text-center md:text-left" style="flex-basis: 540px;">
      <img
        src="@/assets/images/logo-nr.png"
        class="h-24 w-auto mx-auto mb-5 sm:h-28 md:h-44 md:ml-0"
        alt="Logo Nicolás Romero"
      >
      <h1 class="text-white font-light text-4xl sm:text-6xl lg:absolute lg:bottom-36">
        Bienvenido
        <br> a
        <strong class="font-bold">Nominas</strong>
        <br> Tu Empresa
      </h1>
      <h2 class="text-white font-light text-base mt-5 sm:text-xl lg:absolute sm:bottom-24">
        Nos renovamos para ofrecerte
        <strong class="font-bold">un mejor servicio.</strong>
      </h2>
    </div>
    <div class="flex-grow py-7 px-6 sm:px-16 sm:pt-36 bg-white" style="flex-basis: 484px;">
      <slot />
    </div>
  </div>
</template>
