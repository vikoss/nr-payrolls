<template>
  <div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Razon social
          </th>
          <th class="text-left">
            Fecha de solicitud
          </th>
          <th class="text-left">
            Estatus
          </th>
          <th class="text-left">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="request in requestsProviders"
          :key="request.id"
        >
          <td>{{ request.company.socialReason }}</td>
          <td>{{ timestampFormated(request.created_at) }}</td>
          <td>{{ request.status.description }}</td>
          <td>
            <v-btn @click="goToRequest(request.id)">
              Atender
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import CarouselFiles from '@/components/CarouselFiles.vue'
import { useRequestProvider } from '@/composables/useRequestProvider'
import { timestampFormated } from '@/utils/helpers'

export default {
  components: { CarouselFiles },
  setup() {
    const router = useRouter()
    const { getRequestsProvidersByStatus, requestsProviders } = useRequestProvider()

    getRequestsProvidersByStatus('DOCUMENTATION_IN_REVIEW')

    return {
      goToRequest: (id) => router.push(`/solicitudes/${id}/documentacion`),
      requestsProviders,
      timestampFormated,
    }
  }

}
</script>
