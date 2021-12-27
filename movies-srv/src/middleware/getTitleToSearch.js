module.exports = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "invalid body" });
    }
    const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "invalid title" });
  }
    req.movie.searchStr = title;
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  next();
  }