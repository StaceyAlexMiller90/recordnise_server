'use strict'
const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../config/constants')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Test User',
          email: 'test@test.com',
          password: bcrypt.hashSync('test1234', SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Master DJ',
          email: 'dj@dj.com',
          password: bcrypt.hashSync('dj1234', SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Music Lover',
          email: 'music@music.com',
          password: bcrypt.hashSync('music1234', SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  },
}
