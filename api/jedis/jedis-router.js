const router = require('express').Router();
const Jedis = require('./jedis-model');

const { validateId, validateName } = require('./jedis-middleware');

router.get('/', (req, res, next) => {
    Jedis.getAll()
    .then(jedis => {
        res.json(jedis)
    })
    .catch(err => {
        next(err)
    })
})


router.get('/:id', validateId, (req, res, next) => {
    res.json(req.jediId)
})

router.post('/', validateName, async (req, res, next) => {
    try{
        res.status(201).json(await Jedis.add(req.body))
    }
    catch (err) {
        next(err)
    }
})


module.exports = router;