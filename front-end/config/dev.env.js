'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // https://easy-mock.com/mock/5a3e6d38f6d4a408f0379c5a/sna4slack
  BASE_API: '"https://slack.imxieyi.com/"',
})
