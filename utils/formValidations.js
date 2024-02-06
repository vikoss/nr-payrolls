const required = (value) => !!value || 'Este campo es requerido'
const multipleFileRequired = (value) => !!value.length || 'Este campo es requerido'
const password = (value) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  if (regex.test(value)) {
    return true
  }
  return 'La contraseña debe tener al menos 8 caracteres, una letra y un número'
}

export {
  required,
  multipleFileRequired,
  password,
}
