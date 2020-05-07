const { Router } = require('express')
const authMiddleware = require('../auth/middleware')
const Record = require('../models/').record
const CollectionItems = require('../models/').collectionItems

const router = new Router()

router.get('/', authMiddleware, async (req, res, next) => {
  const userId = parseInt(req.user.id)

  try {
    const userRecords = await CollectionItems.findAndCountAll({
      where: { userId },
      include: [Record],
      order: [['createdAt', 'DESC']],
    })
    const filtered = userRecords.rows.map((record) => record.record)
    res.status(200).send({ records: filtered, count: userRecords.count })
  } catch (e) {
    next(e)
  }
})

router.post('/', authMiddleware, async (req, res, next) => {
  const userId = parseInt(req.user.id)
  const {
    id,
    title,
    artist,
    lowestPrice,
    genre,
    style,
    format,
    year,
    imageUrl,
  } = req.body

  try {
    const found =
      id &&
      (await Record.findOne({
        where: {
          discogsId: id,
        },
      }))
    if (found) {
      const alreadyAdded = await CollectionItems.findOne({
        where: {
          recordId: found.id,
        },
      })
      if (alreadyAdded) {
        res
          .status(400)
          .send({ message: 'Record already exists in your collection' })
      } else {
        await CollectionItems.create({
          userId,
          recordId: found.id,
        })
        res.status(200).send({ message: 'Record added', newRecord: found })
      }
    } else {
      const newRecord = await Record.create({
        artist,
        title,
        genre,
        style,
        format,
        year,
        lowestPrice:
          lowestPrice === 'Unknown' ? 0 : Math.round(parseInt(lowestPrice)),
        discogsId: id,
        imageUrl,
      })
      await CollectionItems.create({ userId, recordId: newRecord.id })
      res.status(200).send({ message: 'Record added', newRecord: newRecord })
    }
  } catch (e) {
    console.log(e.errors)
    res.status(400).send({ message: 'Sorry! Something went wrong' })
    next(e)
  }
})

router.delete('/', authMiddleware, async (req, res, next) => {
  const userId = parseInt(req.user.id)
  const { recordId } = req.body
  try {
    const recordToDelete = await CollectionItems.findOne({
      where: { userId, recordId },
    })
    await recordToDelete.destroy()
    res.status(200).send({ message: 'record deleted' })
  } catch (e) {
    console.log(e.errors)
    res.status(400).send({ message: 'Sorry! Something went wrong' })
    next(e)
  }
})

module.exports = router
