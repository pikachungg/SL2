const request = require("supertest");

describe('login as a user', () => { 
    test('should return unsuccesfully with no/incorrect creds', async function() { 
        const response = await request("http://localhost:8000")
            .get("/login")
            .set('Accept', 'application/json')
            expect(response.status).toEqual(404);
     })

     test('should return succesfully with creds', async function() { 
        const data = {
            email: "Fredrick.Tal@rit.edu",
            password: "test"
        }
        const response = await request("http://localhost:8000")
            .post("/login")
            .send(data)
            expect(response.status).toEqual(200);
     })
})
