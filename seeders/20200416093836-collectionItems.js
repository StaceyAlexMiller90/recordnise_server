'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'collectionItems',
      [
        {
          userId: 1,
          recordId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          recordId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          recordId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          recordId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          recordId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          recordId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          recordId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          recordId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          recordId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          recordId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          recordId: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          recordId: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          recordId: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          recordId: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          recordId: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          recordId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          recordId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          recordId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          recordId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          recordId: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          recordId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('collectionItems', null, {})
  },
}
