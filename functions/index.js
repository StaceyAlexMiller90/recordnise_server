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
          },
          {
            type: "TEXT_DETECTION"
          }
      ]
    };
    const response = await client.annotateImage(request)
    // Response from text detection
    const textSearch = response[0].fullTextAnnotation.text
    const formattedText = response[0].textAnnotations.map(word => {
      return word.description
    }).filter(word => {
        const alphaNumeric = new RegExp(/^[a-zA-Z0-9-]+$/)
        return alphaNumeric.test(word)
      }).join(' ')
    // Response from web detection
    const keywordSearch = response[0].webDetection.bestGuessLabels[0].label
    // If web result has a high score, search discogs with web, otherwise with text
    if(response[0].webDetection.webEntities.score > 1) {
      return keywordSearch
    } else {
      return formattedText
    }
  } catch (e) {
    console.log(e.message)
  }
}

const searchDiscogs = async (searchtext) => {
  try {
  const response = await db.search(searchtext)
  // console.log(response.results)
  const formattedResponse = response.results.filter(res => {
    if (res.type === 'release' && res.format.includes('Vinyl')){
      return true
    } else {
      return false
    }
  }).map(res => {
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

