<template>
  <div>
    <!-- <v-stepper model-value="3" alt-labels>
      <v-stepper-header>
        <v-stepper-item
          complete
          title="Registro"
          value="1"
        ></v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          title="Subir documentación"
          complete
          value="2"
        ></v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          title="Documentación en revisión"
          subtitle=""
          value="3"
        ></v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          title="Generación de QR"
          value="4"
        ></v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          title="Realizar el pago"
          value="5"
        ></v-stepper-item>

      </v-stepper-header>
      <v-stepper-window>
        <v-stepper-window-item
          v-for="(item, index) in 5"
          :key="index"
          :value="item"
        >
          <v-card>
            <v-card-title>
              Documentación rechazada
            </v-card-title>
            <v-card-subtitle>
              Es necesario que corrigas tu documentación
            </v-card-subtitle>
            <v-card-actions>
              <v-btn @click="$route.push(`/solicitudes/${$route.params.id}/documentacion/editar`)">
                Corregir
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-window-item>
      </v-stepper-window>
    </v-stepper> -->
    <v-stepper v-model="currentStep" alt-labels>
      <v-stepper-header>
        <!-- <v-stepper-item
          v-for="(step, index) in steps"
          :key="index"
          :complete="step.complete"
          :title="step.name"
          :value="index + 1"
        >
        </v-stepper-item>
        <v-divider></v-divider> -->
        <template v-for="(step, index) in steps" :key="`${index}-step`">
            <v-stepper-item
              :complete="currentStep > (index + 1)"
              :step="`Step {{ index + 1 }}`"
              :title="step.name"
              :value="index + 1"
            ></v-stepper-item>

            <v-divider
              v-if="(index + 1) !== steps.length"
              :key="index"
            ></v-divider>
          </template>
      </v-stepper-header>
      <!-- <v-stepper-window>
        <v-stepper-window-item v-for="(step, index) in steps" :value="index + 1" :key="index">
        </v-stepper-window-item>
      </v-stepper-window> -->
    </v-stepper>
    <v-card>
      <v-card-title>
        {{ isRejected ? 'Documentación rechazada' : 'Documentación aprobada' }}
      </v-card-title>
      <v-card-text>
        {{ isRejected ? 'Es necesario que corrigas tu documentación' : 'Estamos procesando tu solicitud...' }}
      </v-card-text>
      <v-card-actions v-if="isRejected">
        <v-btn elevation="2" @click="$router.push(`/solicitudes/${$route.params.id}/documentacion/editar`)">
          Corregir
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { useRequestProviderStatus } from '@/composables/useRequestProviderStatus'
import { useRequestProvider } from '@/composables/useRequestProvider'
import { REQUESTS_PROVIDERS_STATUS } from '@/utils/constants'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const { getStatus, status } = useRequestProviderStatus()
    const { getRequestProviderById } = useRequestProvider()
    const request = ref({})
    const route = useRoute()
    const currentStep = ref(3)
    const steps = reactive([
      {
        name: 'Registro',
        complete: true,
      },
      {
        name: 'Subir documentación',
        complete: true,
      },
      {
        name: 'Documentación en revisión',
        complete: false,
      },
      {
        name: 'Generación de QR',
        complete: false,
      },
      {
        name: 'Realizar pago',
        complete: false,
      },
    ])
    getStatus()

    const init = async () => {
      request.value = await getRequestProviderById(route.params.id)
    }
    init()

    const isRejected = computed(() => {
      const statusObject = status.value.find((item) => item.name === REQUESTS_PROVIDERS_STATUS.REJECTED_DOCUMENTATION)
      console.log(request);
      console.log(statusObject);
      console.log(request.status_id === statusObject?.id)
      return request.value.status_id === statusObject?.id
    })

    return {
      steps,
      isRejected,
      currentStep,
    }
  }

}
</script>

<style>

</style>