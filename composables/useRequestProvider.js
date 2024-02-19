import { collection, doc, getDocs, query, setDoc, where, updateDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import { useRequestProviderStatus } from '@/composables/useRequestProviderStatus'

export function useRequestProvider() {
  const { $firestore } = useNuxtApp()
  const { getStatusByName, getStatus, status } = useRequestProviderStatus()

  const requestProvider = ref([])
  const requestsProviders = ref([])

  const error = ref(null)
  const loading = ref(false)

  const createRequestProvider = async ({ comments = '', companyId }) => {
    loading.value = true
    try {
      const status = await getStatusByName('DOCUMENTATION_IN_REVIEW')
      console.log(status);
      requestProvider.value = {
        id: uuid(),
        company_id: companyId,
        status_id: status.id,
        comments,
        created_at: Date.now(),
      }
      await setDoc(doc($firestore, 'requests_providers', requestProvider.value.id), requestProvider.value)
    } catch (error) {
      console.log(error);
      error.value = error
    }
    loading.value = false
  }

  const getRequestsProvidersByStatus = async (statusName) => {
    loading.value = true
    try {
      const requests = []
      const _status = await getStatusByName(statusName)
      console.log(_status);
      const querySnapshot = await getDocs(query(collection($firestore, 'requests_providers'), where('status_id', '==', _status.id)))
      querySnapshot.forEach((doc) => requests.push(doc.data()))
      await getStatus()
      const _requestsProviders = await Promise.all(
        requests.map(async (request) => {
          const companySnapshot = await getDocs(query(collection($firestore, 'companies'), where('id', '==', request.company_id)))
          const companyEntitys = []
          companySnapshot.forEach((doc) => companyEntitys.push(doc.data()))
          const statusEntity = status.value.find((_status) => _status.id === request.status_id)
          console.log(companyEntitys);
          return {
            ...request,
            status: statusEntity,
            company: companyEntitys[0]
          }
        })
      )
      console.log(_requestsProviders);
      requestsProviders.value = _requestsProviders

    } catch (error) {
      error.value = error
      console.log(error);
    }
    loading.value = false
    console.log(requestsProviders.value)
  }

  const getRequestProviderByCompanyId = async (companyId) => {
    loading.value = true
    const _requestsProviders = []
    try {
      const requestsProvidersSnapshot = await getDocs(query(collection($firestore, 'requests_providers'), where('company_id', '==', companyId)))
      requestsProvidersSnapshot.forEach((request) => _requestsProviders.push(request.data()))
    } catch (_error) {
      error.value = _error
    }
    loading.value = false
    return _requestsProviders[0]
  }

  const getRequestProviderById = async (id) => {
    loading.value = true
    const _requestsProviders = []
    try {
      const requestsProvidersSnapshot = await getDocs(query(collection($firestore, 'requests_providers'), where('id', '==', id)))
      requestsProvidersSnapshot.forEach((request) => _requestsProviders.push(request.data()))
    } catch (_error) {
      error.value = _error
    }
    loading.value = false
    return _requestsProviders[0]
  }

  const approvedDocumentation = async (requestProviderId) => {
    loading.value = true
    try {
      await changeRequestProviderStatus(requestProviderId, 'APPROVED_DOCUMENTATION')
    } catch (error) {
      error.value = error
      console.log(error);
    }
    loading.value = false
  }

  const rejectedDocumetation = async (requestProviderId, comments) => {
    loading.value = true
    try {
      await changeRequestProviderStatus(requestProviderId, 'REJECTED_DOCUMENTATION', comments)
    } catch (error) {
      error.value = error
    }
    loading.value = false
  }

  const changeRequestProviderStatus = async (requestProviderId, requestProviderStatusName, comments = '') => {
    const { getStatusByName } = useRequestProviderStatus()
    const status = await getStatusByName(requestProviderStatusName)
    await updateDoc(doc($firestore, 'requests_providers', requestProviderId), {
      status_id: status.id,
      comments,
    })
  }

  return {
    createRequestProvider,
    requestProvider,
    requestsProviders,
    loading,
    error,
    getRequestsProvidersByStatus,
    rejectedDocumetation,
    approvedDocumentation,
    getRequestProviderByCompanyId,
    getRequestProviderById,
    changeRequestProviderStatus,
  }
}
