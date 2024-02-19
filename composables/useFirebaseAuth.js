import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import { ROLES } from '@/utils/constants'

export function useFirebaseAuth() {
  const { $auth, $firestore } = useNuxtApp()
  const router = useRouter()
  const user = useCookie('user')
  const error = ref(null)
  const loading = ref(false)

  const createUser = async ({ rfc, companyEmail, userEmail, password, socialReason, legalRepresentative, legalPersonality, socialObject, phone, fiscalAddress }) => {
    loading.value = true
    error.value = null
    try {
      const { user: responseCreateUser } = await createUserWithEmailAndPassword($auth, userEmail, password)
      const companyId = uuid()

      await setDoc(doc($firestore, 'companies', companyId), {
        id: companyId,
        created_at: Date.now(),
        rfc,
        phone,
        email: companyEmail,
        socialReason,
        legalRepresentative,
        legalPersonality,
        socialObject,
        fiscalAddress,
      })
      const _user = {
        id: responseCreateUser.uid,
        email: userEmail,
        role: ROLES.PROVIDER,
        company_id: companyId,
        created_at: Date.now(),
      }
      await setDoc(doc($firestore, 'users', responseCreateUser.uid), _user)
      user.value = _user
      router.push('/')
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
