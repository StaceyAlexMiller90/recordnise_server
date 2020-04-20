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
    // Response from text detection - removing any non-alphanumeric chars & joining into one string
    // for easy searching
    const formattedText = response[0].textAnnotations.map(word => {
      return word.description
    }).filter(word => {
        const alphaNumeric = new RegExp(/^[a-zA-Z0-9-]+$/)
        return alphaNumeric.test(word)
      }).join(' ')
    // Response from web detection
    const keywordSearch = response[0].webDetection.bestGuessLabels[0].label
    // If web result has a high score, search discogs with web result, otherwise with text result
    if(response[0].webDetection.webEntities.score > 1) {
      return keywordSearch
    } else {
      return formattedText
    }
  } catch (e) {
    console.log(e.message)
  }
}

const formatItem = (item) => {
  return item.length > 1 ? item.join(' | ') : item.join('')
} 

const searchDiscogs = async (searchtext) => {
  try {
  const response = await db.search(searchtext)
  // console.log(response.results)
  const filteredResponse = response.results.filter(res => {
    if (res.type === 'release' && res.format.includes('Vinyl')){
      return true
    } else {
      return false
    }
  })
  const releaseData = await Promise.all(filteredResponse.map(async res => {
    const data = await db.getRelease(res.id)
    return data
  }))
  const formattedResponse = releaseData.map(release => {
    return { 
      artist: formatItem(release.artists.map(artist => artist.name)), 
      title: release.title,
      genre: formatItem(release.genres),
      style: formatItem(release.styles),
      format: formatItem(release.formats.map(format => format.name)),
      lowestPrice: release.lowestPrice ? release.lowestPrice : 'Unknown',
      year: release.year,
      id: release.id,
      imageUrl: release.images[0].uri,
      tracklist: release.tracklist,
      videos: release.videos
    }
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

