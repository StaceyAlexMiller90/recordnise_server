const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const Record = require("../models/").record;
const CollectionItems = require("../models/").collectionItems;

const router = new Router();

router.get('/', authMiddleware, async (req, res, next) => {
  const userId = parseInt(req.user.id)
  try {
    const userRecords = await CollectionItems.findAll({ 
      where: { userId }, 
      include: [Record]
    })
    const filtered = userRecords.map(record => record.record)
    res.status(200).send(filtered)
  } catch(e) {
    next(e)
  }
})

router.post('/', authMiddleware, async (req,res,next) => {
  const userId = parseInt(req.user.id)
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
  res.status(200).send({message: 'Record added', newRecord})
  } catch(e) {
    next(e)
  }
})

router.delete('/', authMiddleware, async (req, res, next) => {
  const userId = parseInt(req.user.id)
  const { recordId } = req.body
  try {
    const recordToDelete = await CollectionItems.findOne({ 
      where: { userId, recordId }
    })
    await recordToDelete.destroy()
    res.status(200).send({message: 'record deleted'})
  } catch(e) {
    next(e)
  }
})


module.exports = router;