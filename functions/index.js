const dotenv = require("dotenv");
const Discogs = require('disconnect').Client;
const vision = require('@google-cloud/vision');

dotenv.config();

//Google Cloud Vision API 
const client = new vision.ImageAnnotatorClient();

//Discogs API 
const key = process.env.DISCOGS_CONSUMER_KEY
const secret = process.env.DISCOGS_CONSUMER_SECRET

const dis = new Discogs({
	consumerKey: key,
	consumerSecret: secret
});

const db = dis.database();

const analyseImage = async image => {
  try {
    const request = {
      image: {
          source: {
              imageUri: image
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
    return keywordSearch
  } catch (e) {
    console.log(e.message)
  }
}

const searchDiscogs = async (searchtext) => {
  try {
  const response = await db.search(searchtext)
  // console.log(response.results)
  const formattedResponse = response.results.filter(res => res.type === 'release' && res.format.includes('Vinyl'))
  .map(res => {
    const split = res.title.split('-')
    res.artist = split[0].trim()
    res.recordTitle = split[1].trim()
    return res
  })
  return formattedResponse
  } catch(e) {
    console.log(e.message)
  }
}

module.exports = {
  analyseImage,
  searchDiscogs
}

