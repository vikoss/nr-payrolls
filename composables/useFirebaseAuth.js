import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import { ROLES } from '@/utils/constants'

export function useFirebaseAuth() {
  const { $auth, $firestore } = useNuxtApp()
  const config = useRuntimeConfig()
  const router = useRouter()
  const user = useCookie('user')
  const error = ref(null)
  const loading = ref(false)

  const createUser = async ({
    employeeNumber,
    rfc,
    fullName = '',
  }) => {
    loading.value = true
    error.value = null
    try {
      const email = `${employeeNumber}@${config.public.emailDomain}`
      const password = rfc
      const { user: responseCreateUser } = await createUserWithEmailAndPassword($auth, email, password)
      const _user = {
        id: responseCreateUser.uid,
        rfc,
        fullName,
        employeeNumber,
        email,
        createdAt: Date.now(),
      }
      await setDoc(doc($firestore, 'users', responseCreateUser.uid), _user)
      /* user.value = _user
      router.push('/') */
    } catch (_error) {
      error.value = _error
    }
    loading.value = false
  }

  const login = async ({ email, password }) => {
    loading.value = true
    error.value = null
    try {
      const { user: responseSignInUser } = await signInWithEmailAndPassword($auth, email, password)
      const userSnapshot = await getDoc(doc($firestore, 'users', responseSignInUser.uid))
      user.value = userSnapshot.data()
      router.push('/')
    } catch (_error) {
      error.value = _error
    }
    loading.value = false
  }

  return {
    createUser,
    error,
    loading,
    login,
  }
}
