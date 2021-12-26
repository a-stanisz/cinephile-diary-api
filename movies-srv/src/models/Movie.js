class Movie {
  constructor(title, releasedDate, genre, director) {
    this.data = { title, releasedDate, genre, director }
  }
}

let hobbit = new Movie(
  'The Hobbit: An Unexpected Journey',
  new Date('2012-12-14'),
  'Adventure, Fantasy',
  'Peter Jackson'
)

console.log(typeof hobbit.data);