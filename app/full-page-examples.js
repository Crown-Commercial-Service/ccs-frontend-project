module.exports = (app) => {
  // Display full page examples index by default if not handled already
  app.get('/full-page-examples/:example', (req, res, next) => {
    res.render(`${req.params.example}/index`, (error, html) => {
      if (error) {
        next(error)
      } else {
        res.send(html)
      }
    })
  })
}
