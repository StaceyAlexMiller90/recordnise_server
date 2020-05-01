'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'records',
      [
        {
          artist: 'Fela Kuti',
          title: "Teacher Don't Teach Me Nonsense",
          genre: 'Afrobeat',
          style: 'Funk/Soul',
          format: 'Vinyl',
          year: 1986,
          discogsId: 333333,
          lowestPrice: 20,
          imageUrl:
            'https://img.discogs.com/X5nQOuVnOauf-OV5ahuPZZ7rNI8=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-4948836-1486250127-9238.jpeg.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          artist: 'Palms Trax',
          title: 'Equation',
          genre: 'Electronic',
          style: 'House',
          format: 'Vinyl',
          year: 2013,
          discogsId: 444444,
          lowestPrice: 12,
          imageUrl:
            'https://img.discogs.com/lsb_z0UySyWmULjA0ekhA1T19NU=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-12618799-1538725057-5419.jpeg.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          artist: 'Call Super',
          title: 'Suzi Ecto',
          genre: 'Electronic',
          style: 'Techno',
          format: 'Vinyl',
          year: 2014,
          discogsId: 555555,
          lowestPrice: 10,
          imageUrl:
            'https://img.discogs.com/Uir0Yvg4Gf8rszVi8OAi26e8UaI=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-6130021-1411818888-7191.jpeg.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('records', null, {})
  },
}
