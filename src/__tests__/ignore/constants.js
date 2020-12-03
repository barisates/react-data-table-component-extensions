export const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Director',
    selector: 'director',
    sortable: true,
  },
  {
    name: 'Genres',
    selector: 'genres',
    sortable: true,
  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true,
  },
];

export const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
    runtime: '92',
    genres: [
      'Comedy',
      'Fantasy',
    ],
    director: 'Tim Burton',
    actors: 'Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page',
    plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
    posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg',
  },
  {
    id: 2,
    title: 'The Cotton Club',
    year: '1984',
    runtime: '127',
    genres: [
      'Crime',
      'Drama',
      'Music',
    ],
    director: null,
    actors: 'Richard Gere, Gregory Hines, Diane Lane, Lonette McKee',
    plot: 'The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.',
    posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg',
  }];
