const request = require('supertest')
const db = require('../../data/dbConfig')
const server = require('../server')

it('correct env var', () => {
    expect(process.env.DB_ENV).toBe('testing')
})

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe('[GET] /api/jedis', () => {
    it('should return a 200 OK status', async () => {
        const res = await request(server).get('/api/jedis')
        expect(res.status).toBe(200)
    }, 3000)
    it('should return a list of jedis', async () => {
        const res = await request(server).get('/api/jedis')
        expect(res.body).toHaveLength(3)
    })
    it('should have first yoda as the first jedi', async () => {
        const res = await request(server).get('/api/jedis')
        console.log('body', res.body[0])
        expect(res.body[0]).toMatchObject({name: 'yoda'})
    })
})

describe('[POST] /api/jedis', () => {
    it('should respond with a 422 status if no name in payload', async () => {
        const res = await request(server).post('/api/jedis').send({name: ''})
        expect(res.status).toBe(422)
    })
    it('should respond with a 201 OK status if post success', async () => {
        const res = await request(server).post('/api/jedis').send({name: 'anakin skywalker'})
        expect(res.status).toBe(201)
    })
    it('should respond with the newly created jedi', async () => {
        let res = await request(server).post('/api/jedis').send({name: 'anakin skywalker'})
        expect(res.body).toMatchObject({name: 'anakin skywalker'})
        res = await request(server).post('/api/jedis').send({name: 'qui-gon jinn'})
        expect(res.body).toMatchObject({name: 'qui-gon jinn'})
    })
})