import { collection, getDocs } from 'firebase/firestore'

export function useRequestProviderStatus() {
  const { $firestore } = useNuxtApp()

  const status = ref([])

  const error = ref(null)
  const loading = ref(false)

  const getStatus = async () => {
    loading.value = true
    try {
      console.log('getStatus');
      const snapshotDocuments = await getDocs(collection($firestore, 'requests_providers_status'))
      snapshotDocuments.forEach(doc => status.value.push(doc.data()))
      console.log('fill', status.value);
    } catch (error) {
      error.value = error
    }
    loading.value = false
  }

  const getStatusByName = async (name) => {
    await getStatus()
    console.log(status.value);
    return status.value.find(status => status.name === name)
  }

  return {
    getStatus,
    getStatusByName,
    status,
    loading,
    error,
  }
}
