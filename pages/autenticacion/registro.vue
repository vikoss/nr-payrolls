<template>
  <div>
    <h1 class="text-3xl font-medium mb-2 text-wine">
      Crear una cuenta
    </h1>
    <h2 class="text-base text-black font-normal mb-10 tracking-wide">
      Ingresa los siguientes datos
    </h2>
    <div class="max-w-md mx-auto">
      <v-form @submit.prevent v-model="formStatus">
        <v-text-field
          v-model="form.rfc"
          :rules="[rules.required]"
          label="RFC"
        />
        <v-text-field
          v-model="form.socialReason"
          :rules="[rules.required]"
          label="Razón social"
        />
        <v-text-field
          v-model="form.fiscalAddress"
          :rules="[rules.required]"
          label="Domicilio fiscal"
        />
        <v-text-field
          v-model="form.socialObject"
          :rules="[rules.required]"
          label="Objeto social"
        />
        <v-text-field
          v-model="form.phone"
          :rules="[rules.required]"
          label="Teléfono"
        />
        <v-text-field
          v-model="form.companyEmail"
          :rules="[rules.required]"
          label="Correo electrónico"
        />
        <v-text-field
          v-model="form.legalRepresentative"
          :rules="[rules.required]"
          label="Representante legal"
        />
        <v-text-field
          v-model="form.legalPersonality"
          :rules="[rules.required]"
          label="Personalidad jurídica"
        />
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
        </div>
        <v-btn
          type="submit"
          block
          @click="formStatus && createUser(form)"
        >
          Registrarte
        </v-btn>
      </v-form>
      <p class="text-center text-base mt-5">
        ¿Ya tienes una cuenta?
        <nuxt-link class="hover:underline text-wine font-bold" to="/autenticacion/inicio-de-sesion">
          Iniciar sesión
        </nuxt-link>
      </p>
    </div>
  </div>
  <loading :show="loading" />
</template>

<script>
import { useFirebaseAuth } from '@/composables/useFirebaseAuth'
import { required, password } from '@/utils/formValidations'
import Loading from '~/components/Loading.vue'

export default {
  components: { Loading },
  setup() {
    const { createUser, error, loading  } = useFirebaseAuth()
    //const config = useRuntimeConfig()
    const form = reactive({
      rfc: '',
      name: '',
      firtSurname: '',
      secondSurname: '',
      employeeNumber: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    })
    const formStatus = ref(null)
    const showPassword = ref(false)

    return {
      showPassword,
      form,
      error,
      loading,
      createUser,
      formStatus,
      rules: {
        required,
        password,
      },
    }
  },
}
</script>
