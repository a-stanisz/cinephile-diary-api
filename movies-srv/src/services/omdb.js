const axios = require('axios');
const { OMDB_APIKEY } = process.env;

const getMovieDataByTitle = (title) => {
  const omdbURI = `http://www.omdbapi.com/?apikey=${OMDB_APIKEY}&t=${title}`
  axios.get(omdbURI)
    .then(res => {
      const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
      console.log('Status Code:', res.status);
      console.log('Date in Response header:', headerDate);
      const movie = res.data;
      console.log(movie);
    })
    .catch(err => console.log('Error: ', err.message));
}

module.exports = getMovieDataByTitle;