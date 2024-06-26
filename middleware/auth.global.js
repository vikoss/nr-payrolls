import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useAuthStore())
  const user = useCookie('user')

  const routeNameWithoutAuth = [
    'autenticacion-registro',
    'autenticacion-inicio-de-sesion',
  ]

  authenticated.value = !!user.value

  if (authenticated.value && routeNameWithoutAuth.includes(to.name)) {
    return navigateTo('/')
  }

  if (!authenticated.value && !routeNameWithoutAuth.includes(to.name)) {
    abortNavigation()
    return navigateTo('/autenticacion/inicio-de-sesion')
  }
})