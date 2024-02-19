import { collection, getDocs} from 'firebase/firestore'
import { ref as refStorage } from 'firebase/storage'
import { getDownloadURL } from 'firebase/storage'

export function useDocuments() {
  const { $firestore, $storage } = useNuxtApp()

  const documents = ref([])

  const error = ref(null)
  const loading = ref(false)

  const getDocumentTypes = async () => {
    loading.value = true
    try {
      const snapshotDocuments = await getDocs(collection($firestore, 'document_types'))
      snapshotDocuments.forEach(doc => documents.value.push(doc.data()))
    } catch (_error) {
      error.value = _error
    }
    loading.value = false
  }

  const getPublicUrl = async (referencePath) => {
    loading.value = true
    const _publicUrl = ref('')
    try {
      _publicUrl.value = await getDownloadURL(refStorage($storage, referencePath))
    } catch (error) {
      error.value = error
    }
    loading.value = false
    return _publicUrl.value
  }

  return {
    getPublicUrl,
    getDocumentTypes,
    documents,
    loading,
    error,
  }
}
