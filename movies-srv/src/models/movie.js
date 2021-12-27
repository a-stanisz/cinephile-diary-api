// class Movie {
//   constructor(title, releasedDate, genre, director) {
//     this.data = { title, releasedDate, genre, director }
//   }
  
// }

// let hobbit = new Movie(
//   'The Hobbit: An Unexpected Journey',
//   new Date('2012-12-14'),
//   'Adventure, Fantasy',
//   'Peter Jackson'
// )

// // console.log(hobbit.data);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
    },
    genre: {
      type: String,
    },
    director: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', entrySchema);