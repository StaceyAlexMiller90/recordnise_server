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
        data: discogsResponse,
      })
      console.log(discogsResponse)
    } catch (e) {
      next(e)
    }
  } else {
    try {
      const googleResponse = await analyseImage(imageUrl)
      const discogsResponse = await searchDiscogs(googleResponse)
      res.status(200).send({
        message: 'Scanning complete',
        suggestion: googleResponse,
        data: discogsResponse,
      })
    } catch (e) {
      next(e)
    }
  }
})

module.exports = router
