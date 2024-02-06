<template>
  <div>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-card-item>
        <v-card-title>
          Inicia sesión
        </v-card-title>
        <v-card-subtitle>
          Ingresa tu correo y contraseña
        </v-card-subtitle>
      </v-card-item>
      <v-form @submit.prevent>
        <v-text-field
          v-model="form.rfc"
          :rules="[rules.required]"
          label="RFC"
        />
        <v-text-field
          v-model="form.password"
          :rules="[rules.password]"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          label="Contraseña"
        />
        <v-btn type="submit" block class="mt-2" @click="login(form)">Entrar</v-btn>
        <nuxt-link to="/autenticacion/registro">Registrate</nuxt-link>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { useFirebaseAuth } from '@/composables/useFirebaseAuth'
import { required, password } from '@/utils/formValidations'

export default {
  setup() {
    const { login, error, loading  } = useFirebaseAuth()
    const config = useRuntimeConfig()

    const form = reactive({
      email: computed(() => `${form.rfc}@${config.public.emailDomain}`),
      password: '',
      rfc: '',
    })

    const showPassword = ref(false)

    return {
      showPassword,
      form,
      login,
      error,
      loading,
      rules: {
        required,
        password,
      },
    }
  }
}
</script>

<style>

</style>