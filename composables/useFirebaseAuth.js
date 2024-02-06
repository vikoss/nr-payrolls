import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc} from 'firebase/firestore'
import { v4 as uuid } from 'uuid'

export function useFirebaseAuth() {
  const { $auth, $firestore } = useNuxtApp()
  const router = useRouter()
  const user = useCookie('user')
  const error = ref(null)
  const loading = ref(false)

  const createUser = async ({ rfc, companyEmail, userEmail, password, socialReason, legalRepresentative, legalPersonality, socialObject, phone, fiscalAddress }) => {
    loading.value = true
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
      const responseSaveUser = await setDoc(doc($firestore, 'users', responseCreateUser.uid), {
        id: responseCreateUser.uid,
        email: userEmail,
        company_id: companyId,
        created_at: Date.now(),
      })
      user.value = responseSaveUser
      router.push('/')
    } catch (error) {
      error.value = error
    }
    loading.value = false
  }

  const login = async ({ email, password }) => {
    loading.value = true
    try {
      const { user: responseSignInUser } = await signInWithEmailAndPassword($auth, email, password)
      user.value = responseSignInUser
      router.push('/')
    } catch (error) {
      error.value = error
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
