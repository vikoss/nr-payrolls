<template>
  <div>
    <carousel-files :files="files" />
  </div>
  <div class="flex justify-center gap-4 mt-10">
    <v-btn @click="modal = true">
      Rechazar documentación
    </v-btn>
    <v-btn @click="approved">
      Aprobar documentación
    </v-btn>
  </div>
  <!-- MODAL -->
  <div class="text-center">
    <v-dialog
      v-model="modal"
      width="auto"
    >
      <v-card>
        <v-card-item>
          <v-card-title>
            Rechazar documentación
          </v-card-title>
          <v-card-subtitle>
            Escribe el motivo por el que se esta rechazando la documentación
          </v-card-subtitle>
        </v-card-item>
        <v-card-text>
          <v-textarea label="Motivo de rechazo" v-model="comments"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="rejected">Enviar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CarouselFiles from '@/components/CarouselFiles.vue'
import { useRequestProvider } from '@/composables/useRequestProvider'
import { useCompanyDocumentation } from '@/composables/useCompanyDocumentation'

export default {
  components: { CarouselFiles },
  setup() {
    const { approvedDocumentation, rejectedDocumetation } = useRequestProvider()
    const { getCompanyDocumentation, companyDocumentation } = useCompanyDocumentation()
    console.log(companyDocumentation.value);
    const route = useRoute()
    const router = useRouter()
    const comments = ref('')
    const modal = ref(false)

    const files = computed(() => companyDocumentation.value.map((file) => ({ src: file.publicUrl, name: file.document_type.name })))

    getCompanyDocumentation(route.params.id)

    const approved = () => {
      approvedDocumentation(route.params.id)
      router.push('/solicitudes')
    }

    const rejected = () => {
      rejectedDocumetation(route.params.id, comments.value)
      router.push('/solicitudes')
    }

    return {
      approved,
      rejected,
      comments,
      modal,
      files,
    }
  },
}
</script>
