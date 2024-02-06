import { collection, getDocs } from 'firebase/firestore'

export function useDocuments() {
  const { $firestore } = useNuxtApp()

  const documents = ref([])

  const error = ref(null)
  const loading = ref(false)

  const getDocuments = async () => {
    loading.value = true
    try {
      const snapshotDocuments = await getDocs(collection($firestore, 'documents'))
      snapshotDocuments.forEach(doc => documents.value.push(doc.data()))
    } catch (error) {
      error.value = error
    }
    loading.value = false
  }

  return {
    getDocuments,
    documents,
    loading,
    error,
  }
}
