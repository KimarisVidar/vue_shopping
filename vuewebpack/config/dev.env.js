'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HTTP_HOST: '"http://localhost"',
  API_PATH: '"https://vue-course-api.herokuapp.com"',
  CUSTOM_PATH: '"rex"',
})