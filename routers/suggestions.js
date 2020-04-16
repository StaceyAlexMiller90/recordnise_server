const { Router } = require("express");
const { Op } = require("sequelize")
const authMiddleware = require("../auth/middleware");
const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient();
const Discogs = require('disconnect').Client;

var oAuth = new Discogs().oauth();
oAuth.getRequestToken(
  'CONSUMER_KEY', 
  'CONSUMER_SECRET', 
  'http://your-script-url/callback', 
  function(err, requestData){
    // Persist "requestData" here so that the callback handler can 
    // access it later after returning from the authorize url
    res.redirect(requestData.authorizeUrl);
  }
);

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

// For Later
// https://api.discogs.com/database/search?q={query}&{?title=`${keywordSearch}`}

module.exports = router;

