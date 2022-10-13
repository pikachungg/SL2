const request = require("supertest");       // Testing framework
const server = 'http://localhost:8000';     // Server address
const p = '6317f5f08f5025ccd1882972';       // Professor UID in DB

describe('Get Professor Info', () => { 
    test('Should return professor data by correct uid', async function() { 
        const uid = '6317f5f08f5025ccd1882972';
        const response = await request(server)
            .get("/professors/uid/" + uid)
            .set('Accept', 'application/json')
            expect(response.status).toEqual(200);
            expect(response.body.email).toEqual('Fredrick.Tal@rit.edu')
     })
     
    test('should return error with incorrect uid', async function() { 
        const uid = 'thiswillneverwork';
        const response = await request(server)
            .get("/professors/uid/" + uid)
            .set('Accept', 'application/json')
            expect(response.status).toEqual(500);
     })

})

describe('Pinned student information', () => {
    test('Student should be added as a pinned student, then removed from list', async function() { 
        const s = 'bxr3877';
        const res = await request(server)
            .patch('/professors/pinned')
            .query({
                puid: p,
                suid: s
            })
        expect(res.status).toEqual(200);

        const res2 = await request(server)
            .delete('/professors/pinned')
            .query({
                puid: p,
                suid: s
            })
        expect(res2.status).toEqual(200);
            
    })
    
    test('Student should already exist when attempting to be added', async function() {
        const p = '6317f5f08f5025ccd1882972';
        const s = 'exp7267';
        const res = await request(server)
            .patch('/professors/pinned')
            .query({
                puid: p,
                suid: s
            })
        expect(res.status).toEqual(304);
    })
    
    test('Student should not exist', async function() {
        const s = 'helpme123';
        const res = await request(server)
            .patch('/professors/pinned')
            .query({
                puid: p,
                suid: s
            })
        expect(res.status).toEqual(404);
    })

    test('Should get pinned students by professor', async function() {
        const res = await request(server)
            .get('/professors/pinned/' + p)
            expect(res.status).toEqual(200);
    })
    
    test('Professor does not exist when getting pinned students', async function() {
        const res = await request(server)
            .get('/professors/pinned/' + 'UIDthatdontexist')
            expect(res.status).toEqual(500);
    })

})