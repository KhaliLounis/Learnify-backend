const notFound = (req, res) => {
  res.status(404).send("route not found");
};
module.exports = notFound;
