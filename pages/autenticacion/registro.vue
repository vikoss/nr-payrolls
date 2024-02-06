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
        <v-btn type="submit" block class="mt-2" @click="createUser(form)">Entrar</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { useFirebaseAuth } from '@/composables/useFirebaseAuth'
import { required, password } from '@/utils/formValidations'

export default {
  setup() {
    const { createUser, error, loading  } = useFirebaseAuth()
    const config = useRuntimeConfig()
    const form = reactive({
      rfc: '',
      userEmail: computed(() => `${form.rfc}@${config.public.emailDomain}`),
      companyEmail: '',
      phone: '',
      password: '',
      passwordConfirmation: '',
      socialReason: '',
      legalRepresentative: '',
      legalPersonality: '',
      socialObject: '',
      fiscalAddress: '',
    })
    const showPassword = ref(false)

    return {
      showPassword,
      form,
      createUser,
      rules: {
        required,
        password,
      },
    }
  },
}
</script>
