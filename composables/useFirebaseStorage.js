import { ref as refStorage, uploadBytes } from 'firebase/storage'
import { v4 as uuid } from 'uuid'

export function useFirebaseStorage() {
  const { $storage } = useNuxtApp()

  const error = ref(null)
  const loading = ref(false)

  const uploadFile = async (file, path) => {
    let data = null
    loading.value = true
    try {
      const fileName = file.name
      const fileNameSplit = fileName.split('.')
      const fileExtension = fileNameSplit[fileNameSplit.length - 1]
      data = await uploadBytes(refStorage($storage, `${path}/${uuid()}.${fileExtension}`), file)
      console.log(data)
    } catch (error) {
      error.value = error
    }
    loading.value = false
    return data
  }

  return {
    error,
    loading,
    uploadFile,
  }
}
