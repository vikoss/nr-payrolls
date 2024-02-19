<template>
  <div>
    <v-card max-width="344" prepend-icon="mdi-sticker-check-outline" v-if="user.role === ROLES.REVIEWER">
      <template v-slot:title>
        Atender solicitudes
      </template>
      <v-card-subtitle>
        Revisar documentación de solicitudes
      </v-card-subtitle>
      <v-card-text></v-card-text>
      <v-card-actions>
        <v-btn elevation="2" @click="$router.push('/solicitudes')">
          Entrar
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card max-width="344" prepend-icon="mdi-plus" v-if="(user.role === ROLES.PROVIDER) && !alreadyHaveARequest">
      <template v-slot:title>
        Iniciar solicitud
      </template>
      <v-card-subtitle>
        Iniciar una solicitud como proveedor
      </v-card-subtitle>
      <v-card-text></v-card-text>
      <v-card-actions>
        <v-btn elevation="2" @click="$router.push('/solicitudes/nueva')">
          Entrar
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card max-width="344" prepend-icon="mdi-list-status" v-if="(user.role === ROLES.PROVIDER) && alreadyHaveARequest">
      <template v-slot:title>
        Estatus de solicitud
      </template>
      <v-card-subtitle>
        Ver el estatus de la solicitud
      </v-card-subtitle>
      <v-card-text></v-card-text>
      <v-card-actions>
        <v-btn elevation="2" @click="$router.push(`/solicitudes/${requestProvider.id}/seguimiento`)">
          Entrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { ROLES } from '@/utils/constants'
import { useRequestProvider } from '@/composables/useRequestProvider'

export default {
  setup() {
    const user = useCookie('user')
    const router = useRouter()
    const alreadyHaveARequest = ref(false)
    const requestProvider = ref({})
    const { getRequestProviderByCompanyId } = useRequestProvider()
    const init = async () => {
      requestProvider.value = await getRequestProviderByCompanyId(user.value.company_id)
      console.log(requestProvider.value);
      alreadyHaveARequest.value = !!requestProvider.value
    }

    init()

    return {
      user,
      ROLES,
      router,
      alreadyHaveARequest,
      requestProvider,
    }
  }

}
</script>

<style>

</style>