const router = require('express').Router();
const Jedis = require('./jedis-model');

const { validateId, validateName } = require('./jedis-middleware');

router.get('/', (req, res) => {
    Jedis.getAll()
    .then(jedis => {
        res.status(200).json(jedis)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


router.get('/:id', validateId, (req, res) => {
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