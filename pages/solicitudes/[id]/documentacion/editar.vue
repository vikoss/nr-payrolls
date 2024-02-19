<template>
  <h1>La documentación fue rechazada</h1>
  <h1>Motivo:</h1>
  <h1>{{ currentRequestProvider.comments }}</h1>
  <v-form @submit.prevent class="max-w-md mx-auto" v-model="formStatus">
    <div v-for="(document, index) in documents" :key="index">
      <v-file-input
        :label="document.name"
        :multiple="document.multiple"
        :rules="document.required ? [rules.required] : []"
        @change="someT($event, document.id)"
      />
    </div>
    <v-btn type="submit" block class="mt-2" @click="sendDocumentation">Enviar documentación</v-btn>
  </v-form>
</template>

<script>
import { multipleFileRequired } from '@/utils/formValidations'
import { useDocuments } from '@/composables/useDocuments'
import { useFirebaseStorage } from '@/composables/useFirebaseStorage'
import { useRequestProvider } from '@/composables/useRequestProvider'
import { useCompanyDocumentation } from '@/composables/useCompanyDocumentation'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { deleteDoc, doc } from 'firebase/firestore'

export default {
  setup() {
    const { loading, error, documents, getDocumentTypes } = useDocuments()
    const { uploadFile } = useFirebaseStorage()
    const { createRequestProvider, requestProvider, getRequestProviderById, changeRequestProviderStatus } = useRequestProvider()
    const { createCompanyDocumentation, getCompanyDocumentation, companyDocumentation } = useCompanyDocumentation()
    const user = useCookie('user')
    const router = useRouter()
    const route = useRoute()
    const { $firestore } = useNuxtApp()
    const currentRequestProvider = ref({})
    console.log(user.value);
    getDocumentTypes()
    const form = reactive([])
    const files = ref([])
    const formStatus = ref(null)
    const someT = (e, documentId) => {
      // e.target.files
      console.log(e)
      console.log(documentId)

      files.value = {
        ...files.value,
        [documentId]: {
          files: e.target.files,
          bucketPathFiles: [],
        },
      }
    }

    const sendDocumentation = async () => {
      try {
        console.log('sendDocumentation');
        // crear solicitud de proveedor
        //await createRequestProvider({ companyId: user.value.company_id })
        // cargar los archivos al bucket
        await Promise.all(
          Object.keys(files.value).map(async (documentId) => {
            console.log(files.value[documentId].files)
            return await Promise.all(Array.from(files.value[documentId].files).map(async (file, indexFile) => {
              const fileSaved = await uploadFile(file, 'documentation')
              files.value[documentId].bucketPathFiles[indexFile] = fileSaved.metadata.fullPath
            })
            )
          })
        )
        // crear documentos
        const documents = []
        Object.keys(files.value).forEach(documentId => files.value[documentId].bucketPathFiles.forEach((file) => {
          documents.push({ typeId: documentId, bucketPath: file })
        }))
        //console.log(requestProvider.value)
        // remove before documentation
        await getCompanyDocumentation(route.params.id)
        console.log('getCD', companyDocumentation.value);
  
        await Promise.all(
          companyDocumentation.value.map(async (file) => {
            return await deleteDoc(doc($firestore, 'files', file.id))
          })
        )
        // crate files "documentation"
        await createCompanyDocumentation({ requestProviderId: route.params.id, documents })

        await changeRequestProviderStatus(route.params.id, 'DOCUMENTATION_IN_REVIEW')
        router.push('/')
      } catch (error) {
        console.log(error);
      }
    }

    const init = async () => {
      currentRequestProvider.value = await getRequestProviderById(route.params.id)
    }
    init()

    return {
      sendDocumentation,
      files,
      currentRequestProvider,
      documents,
      someT,
      form,
      formStatus,
      rules: {
        required: multipleFileRequired,
      },
    }
  }
}
</script>
