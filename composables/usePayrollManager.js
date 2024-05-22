import { ref as refStorage, listAll, getDownloadURL } from 'firebase/storage'

export function usePayrollManager() {
  const { $storage } = useNuxtApp()
  const user = useCookie('user')

  const error = ref(null)
  const loading = ref(false)
  const isCompleted = ref(false)
  const listPayroll = ref([])

  const getListPayrollByYear = async (year) => {
    loading.value = true
    error.value = null
    isCompleted.value = false

    try {
      const { employeeNumber } = user.value
      const data = await listAll(refStorage($storage, `${employeeNumber}/${year}`))
      const payrolls = []
      data.items.forEach(item => {
        payrolls.push({
          fileName: item.name,
          path: item.fullPath,
        })
      })
      listPayroll.value = payrolls
      isCompleted.value = true
    } catch (_error) {
      error.value = _error
    }

    loading.value = false
  }

  const downloadPayroll = async (payrollPath) => {
    loading.value = true
    error.value = null

    try {
      const url = await getDownloadURL(refStorage($storage, payrollPath))
      window.open(url, '_blank')
    } catch (error) {
      error.value = _error
    }

    loading.value = false
  }


  return {
    getListPayrollByYear,
    isCompleted,
    listPayroll,
    loading,
    error,
    downloadPayroll,
  }
}
