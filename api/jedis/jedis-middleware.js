const Jedis = require('./jedis-model');


const validateId = async (req, res, next) => {
    try{
        const jediId = await Jedis.getById(req.params.id);
        if(!jediId) {
            res.status(404).json({
                message: `Jedi with id ${jediId} is not found`
            })
        } else {
            req.jediId = jediId;
            next()
        }
    }
    catch (err) {
        next(err)
    }
}

const validateName = async (req, res, next) => {
    try{
        const { name } = req.body;
        if(!name || !name.trim()) {
            res.status(422).json({message: 'Must enter a valid name'})
        } else {
            next()
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    validateId, 
    validateName
};