<template>
  <div>
    <v-card
      max-width="344"
      elevation="2"
      prepend-icon="mdi-account-file-text-outline"
    >
      <template v-slot:title>
        Nómina
      </template>
      <v-card-subtitle>
        Consulta el historial de tus nóminas
      </v-card-subtitle>
      <v-card-actions>
        <v-btn elevation="2" @click="$router.push('/nominas')">
          Consultar nómina
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
