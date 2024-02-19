import { doc, setDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import { where, query } from 'firebase/firestore'
import { collection } from 'firebase/firestore'
import { getDocs } from 'firebase/firestore'
import { useDocuments } from './useDocuments'

export function useCompanyDocumentation() {
  const { $firestore } = useNuxtApp()

  const companyDocumentation = ref([])

  const error = ref(null)
  const loading = ref(false)

  const createCompanyDocumentation = async ({ documents, requestProviderId }) => {
    loading.value = true
    try {
      console.log(documents)
      await Promise.all(
        documents.map(async (document) => {
          const fileId = uuid()
          return await setDoc(doc($firestore, 'files', fileId), {
            id: fileId,
            bucketPath: document.bucketPath,
            document_type_id: document.typeId,
            requests_providers_id: requestProviderId,
            created_at: Date.now(),
          })
        })
      )
    } catch (error) {
      error.value = error
    }
    loading.value = false
  }

  const getCompanyDocumentation = async (requestProviderId) => {
    loading.value = true
    try {
      const { getDocumentTypes, documents: documentTypes, getPublicUrl } = useDocuments()
      const files = []
      const filesSnapshot = await getDocs(
        query(
          collection($firestore, 'files'),
          where('requests_providers_id', '==', requestProviderId)
        )
      )
      filesSnapshot.forEach((doc) => files.push(doc.data()))
      console.log(files)
      await getDocumentTypes()
      console.log(documentTypes.value)
      companyDocumentation.value = files.map((file) => {
        const documentType = documentTypes.value.find((documentType) => documentType.id === file.document_type_id)
        return { ...file, document_type: documentType }
      })
      console.log(companyDocumentation.value);
      await Promise.all(
        companyDocumentation.value.map(async (file, index) => {
          const publicUrl = await getPublicUrl(file.bucketPath)
          companyDocumentation.value[index].publicUrl = publicUrl
          return
        })
      )
      console.log(companyDocumentation.value);

    } catch (_error) {
      error.value = _error
      console.log(_error);
    }
    loading.value = false
  }


  return {
    createCompanyDocumentation,
    getCompanyDocumentation,
    companyDocumentation,
    loading,
    error,
  }
}
