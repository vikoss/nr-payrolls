<template>
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
import { useRouter } from 'vue-router'

export default {
  setup() {
    const { loading, error, documents, getDocumentTypes } = useDocuments()
    const { uploadFile } = useFirebaseStorage()
    const { createRequestProvider, requestProvider } = useRequestProvider()
    const { createCompanyDocumentation } = useCompanyDocumentation()
    const user = useCookie('user')
    const router = useRouter()
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
      // crear solicitud de proveedor
      await createRequestProvider({ companyId: user.value.company_id })
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
      console.log(requestProvider.value)
      await createCompanyDocumentation({ requestProviderId: requestProvider.value.id, documents })
      router.push('/')
    }

    return {
      sendDocumentation,
      files,
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
