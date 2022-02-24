const db = require('../../data/dbConfig');

const getAll = () => {
    return db('jedis');
}

const getById = (id) => {
    return db('jedis')
    .where('id', id)
    .first()
}

const add = async (jedi) => {
    const [id] = await db('jedis')
    .insert(jedi);
    return getById(id)
}


module.exports = {
    getAll, 
    getById, 
    add
}