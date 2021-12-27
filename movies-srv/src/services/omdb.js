const axios = require('axios');
const { OMDB_APIKEY } = process.env;

const getMovieDataByTitle = async (title, ...requestedProps) => {
  try {
    const omdbURI = `http://www.omdbapi.com/?apikey=${OMDB_APIKEY}&t=${title}`;
    const res = await axios.get(omdbURI);
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.status);
    console.log('Date in Response header:', headerDate);
    return res.data;
  } catch (err) {
    console.log('Error: ', err.message);
  }
}

module.exports = getMovieDataByTitle;