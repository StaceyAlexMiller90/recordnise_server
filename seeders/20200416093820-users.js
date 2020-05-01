'use strict'
const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../config/constants')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Antal',
          email: 'Antal@Antal.com',
          password: bcrypt.hashSync('antal1234', SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Call Super',
          email: 'Call@Super.com',
          password: bcrypt.hashSync('callsuper1234', SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Palms Trax',
          email: 'palms@palms.com',
          password: bcrypt.hashSync('palms1234', SALT_ROUNDS),
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
