<template>
  <div class="flex flex-col sm:flex-row gap-7">
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
          Ir a consultar nómina
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card
      max-width="344"
      elevation="2"
      prepend-icon="mdi-account-file-text-outline"
    >
      <template v-slot:title>
        Contraseña
      </template>
      <v-card-subtitle>
        Cambiar la contraseña de tu cuenta
      </v-card-subtitle>
      <v-card-actions>
        <v-btn elevation="2" @click="$router.push('/autenticacion/contrasena')">
          Ir a cambiar contraseña
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
