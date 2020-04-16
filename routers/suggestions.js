const { Router } = require("express");
const { Op } = require("sequelize")
const authMiddleware = require("../auth/middleware");
const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient();

const router = new Router();

router.post('/', authMiddleware, async (req,res,next) => {
  const { imageUrl } = req.body
  try {
    const request = {
      image: {
          source: {
              imageUri: imageUrl
          }
      }, 
      features: [
          {
              type: "WEB_DETECTION"
          }
      ]
    };
  const response = await client.annotateImage(request)
  const keywordSearch = response[0].webDetection.bestGuessLabels[0].label
  res.status(200).send({message: 'Here is what we found...', suggestion: keywordSearch})
  } catch(e) {
    next(e)
  }
})

module.exports = router;