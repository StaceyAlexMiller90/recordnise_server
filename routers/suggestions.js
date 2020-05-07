const { Router } = require('express')
const authMiddleware = require('../auth/middleware')
const { analyseImage } = require('../utils/index')
const { searchDiscogs } = require('../utils/index')

const router = new Router()

router.post('/', authMiddleware, async (req, res, next) => {
  const { imageUrl, title, artist } = req.body
  if (title || artist) {
    try {
      const discogsResponse = await searchDiscogs(`${title} ${artist}`)
      res.status(200).send({
        message: 'Search complete',
        suggestion: `${title} ${artist}`,
        data: discogsResponse ? discogsResponse : [],
      })
    } catch (e) {
      res.status(400).send({ message: 'Sorry! Something went wrong' })
      next(e)
    }
  } else {
    try {
      const googleResponse = await analyseImage(imageUrl)
      const discogsResponse = await searchDiscogs(googleResponse)
      res.status(200).send({
        message: 'Scanning complete',
        suggestion: googleResponse,
        data: discogsResponse ? discogsResponse : [],
      })
    } catch (e) {
      res.status(400).send({ message: 'Sorry! Something went wrong' })
      next(e)
    }
  }
})

module.exports = router
