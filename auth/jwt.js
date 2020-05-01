const jwt = require('jsonwebtoken')

const { jwtSecret } = require('../config/secrets')

const toJWT = (data) => {
  return jwt.sign(data, jwtSecret, { expiresIn: '2h' })
}

const toData = (token) => {
  return jwt.verify(token, jwtSecret)
}

module.exports = { toJWT, toData }
