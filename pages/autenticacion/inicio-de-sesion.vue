<template>
  <div>
    <h1 class="text-3xl font-medium mb-2 text-wine">
      Inicia sesión
    </h1>
    <h2 class="text-base text-black font-normal mb-10 tracking-wide">
      Ingresa los siguientes datos
    </h2>
    <div class="max-w-md mx-auto">
      <v-form @submit.prevent>
        <v-text-field
          v-model="form.employeeNumber"
          :rules="[rules.required]"
          label="Número de empleado"
        />
        <v-text-field
          v-model="form.password"
          :rules="[rules.password]"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          label="Contraseña"
        />
        <div class="mb-9">
          <p v-show="error" class="text-red-error text-xs">
            No pudimos encontrar una cuenta que coincida con lo que ingresó, revisa tus credenciales de acceso por favor.
          </p>
        </div>
        <v-btn
          type="submit"
          block
          @click="login(form)"
        >
          Entrar
        </v-btn>
      </v-form>
    </div>
  </div>
  <loading :show="loading" />
</template>

<script>
import { useFirebaseAuth } from '@/composables/useFirebaseAuth'
import { required, password } from '@/utils/formValidations'
import Loading from '@/components/Loading.vue'

export default {
  components: { Loading },
  layout: 'login',
  setup() {
    const config = useRuntimeConfig()
    const { login, error, loading } = useFirebaseAuth()

    const form = reactive({
      email: computed(() => `${form.employeeNumber}@${config.public.emailDomain}`),
      password: '',
      employeeNumber: '',
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
