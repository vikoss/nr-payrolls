<template>
  <div>
    <h1 class="text-3xl font-medium mb-2 text-wine">
      Cambiar contraseña
    </h1>
    <h2 class="text-base text-black font-normal mb-10 tracking-wide">
      Ingresa los siguientes datos
    </h2>
    <div class="max-w-md mx-auto">
      <v-form @submit.prevent v-model="formStatus">
        <v-text-field
          v-model="form.password"
          :rules="[rules.password]"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          label="Contraseña"
        />
        <v-text-field
          v-model="form.passwordConfirmation"
          :rules="[rules.password]"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          label="Confirmar contraseña"
        />
        <div class="mb-9">
          <p v-show="error" class="text-red-error text-xs">
            Lo sentimos, estamos teniendo problemas.
          </p>
          <p v-show="!passwordMatch" class="text-red-error text-xs">
            Las contraseñas no coinciden
          </p>
        </div>
        <v-btn
          type="submit"
          block
          @click="formStatus &&
            checkPasswordMath() &&
            changePassword(form.password) &&
            logout()
          "
        >
          Cambiar contraseña
        </v-btn>
      </v-form>
    </div>
  </div>
  <loading-component :show="loading" />
  <v-dialog
    v-model="dialog"
    persistent
    max-width="320"
  >
    <v-card>
      <v-card-title class="text-h5">
        Contraseña cambiada
      </v-card-title>
      <v-card-text>
        Por seguridad cerraremos tu sesión
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          elevation="2"
          text
          @click="$router.push('/autenticacion/inicio-de-sesion')"
        >
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { password } from '@/utils/formValidations'
import LoadingComponent from '@/components/Loading.vue'
import { ref } from 'vue'

export default {
  components: { LoadingComponent },
  layout: 'login',
  setup() {
    const {
      changePassword,
      error,
      loading,
      dialog,
      logout,
    } = useFirebaseAuth()

    const form = reactive({
      password: '',
      passwordConfirmation: '',
    })

    const passwordMatch = ref(true)
    const showPassword = ref(false)
    const formStatus = ref(null)

    const checkPasswordMath = () => {
      passwordMatch.value = (form.password === form.passwordConfirmation)

      return passwordMatch.value
    }


    return {
      formStatus,
      showPassword,
      passwordMatch,
      logout,
      form,
      changePassword,
      checkPasswordMath,
      error,
      dialog,
      loading,
      rules: {
        password,
      },
    }
  }
}
</script>
