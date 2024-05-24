module.exports = {
  apps: [
    {
      name: 'nr-payrolls',
      port: '3009',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
