import { signOut } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { updatePassword, getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

export function useFirebaseAuth() {
  const { $auth, $firestore } = useNuxtApp()
  const router = useRouter()
  const user = useCookie('user')
  const error = ref(null)
  const loading = ref(false)
  const dialog = ref(false)

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

  const changePassword = async (newPassword) => {
    loading.value = true
    error.value = null
    try {
      const auth = getAuth()
      const user = auth.currentUser
      await updatePassword(user, newPassword)
      dialog.value = true
    } catch (_error) {
      error.value = _error
    }
    loading.value = false
  }

  const logout = async () => {
    loading.value = true
    error.value = null
    try {
      const auth = getAuth()
      await signOut(auth)
      user.value = null
    } catch (error) {
      error.value = _error
    }
    loading.value = false
  }

  return {
    changePassword,
    error,
    loading,
    dialog,
    login,
    logout,
  }
}
