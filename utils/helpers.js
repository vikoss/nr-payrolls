const timestampFormated = (timestamp) =>
  `${new Date(timestamp).toLocaleDateString('es-MX')} ${new Date(timestamp).toLocaleTimeString('es-MX')}`

export {
  timestampFormated,
}
