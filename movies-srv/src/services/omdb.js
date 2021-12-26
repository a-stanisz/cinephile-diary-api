const { OMDB_APIKEY } = process.env
const omdbURI = `http://www.omdbapi.com/?apikey=${OMDB_APIKEY}&t=${title}`