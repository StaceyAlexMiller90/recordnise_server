const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const Record = require("../models/").record;
const CollectionItems = require("../models/").collectionItems;

const router = new Router();

router.post('/', authMiddleware, async (req,res,next) => {
  const userId = req.user.id
  const {id, title, artist, lowestPrice, genre, style, format, year, imageUrl} = req.body
  try {
    const found = await Record.findOne({
      where: {discogsId: id}
    })
    if(found) {
      await CollectionItems.create({userId, recordId: found.id})
    } else {
      const newRecord = await Record.create({
        artist,
        title,
        genre,
        style,
        format,
        year,
        lowestPrice: lowestPrice === 'Unknown' ? 0 : lowestPrice,
        discogsId: id,
        imageUrl
      })
      await CollectionItems.create({userId, recordId: newRecord.id})
    }
  res.status(200).send({message: 'Record added'})
  } catch(e) {
    next(e)
  }
})


module.exports = router;