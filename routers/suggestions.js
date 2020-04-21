const { Router } = require('express')
const authMiddleware = require('../auth/middleware')
const { analyseImage } = require('../functions/index')
const { searchDiscogs } = require('../functions/index')

const router = new Router()

router.post('/', authMiddleware, async (req, res, next) => {
	const { imageUrl } = req.body
	try {
		const googleResponse = await analyseImage(imageUrl)
		const discogsResponse = await searchDiscogs(googleResponse)
		console.log(googleResponse, discogsResponse)
		res.status(200).send({
			message: 'Scanning complete',
			suggestion: googleResponse,
			data: discogsResponse,
		})
	} catch (e) {
		next(e)
	}
})

module.exports = router
