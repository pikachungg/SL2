const request = require("supertest");

describe('describe students by class id', () => { 
    test('It should respond with succesful GET method', async function() { 
        const response = await request("http://localhost:8000")
            .get("/students/classid/ISTE 140-1")
            .set('Accept', 'application/json')
            expect(response.status).toEqual(200)
     })
})

describe('describe students by class uid', () => { 
    test('It should respond with succesful GET method', async function() { 
        const response = await request("http://localhost:8000")
            .get("/students/uid/71572472")
            .set('Accept', 'application/json')
            expect(response.status).toEqual(200)
            expect(response.type).toEqual('application/json')
     })
})

