'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "records",
    [
      {
        artistName: "Fela Kuti",
        recordName: "Teacher Don't Teach Me Nonsense",
        genre: "Afrobeat",
        style: "Funk/Soul",
        yearReleased: 1986,
        coverArtwork: "https://img.discogs.com/X5nQOuVnOauf-OV5ahuPZZ7rNI8=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-4948836-1486250127-9238.jpeg.jpg",
        averagePrice: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistName: "Palms Trax",
        recordName: "Equation",
        genre: "Electronic",
        style: "House",
        yearReleased: 2013,
        coverArtwork: "https://img.discogs.com/lsb_z0UySyWmULjA0ekhA1T19NU=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-12618799-1538725057-5419.jpeg.jpg",
        averagePrice: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistName: "Call Super",
        recordName: "Suzi Ecto",
        genre: "Electronic",
        style: "Techno",
        yearReleased: 2014,
        coverArtwork: "https://img.discogs.com/Uir0Yvg4Gf8rszVi8OAi26e8UaI=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-6130021-1411818888-7191.jpeg.jpg",
        averagePrice: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {}
  );
},
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("records", null, {});
  }
};