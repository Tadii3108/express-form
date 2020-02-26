describe('testing express form', ()=>{
    const axios = require('axios');
    const readline = require('readline');
    const thefix = require('./thefix')
    let server;

    beforeEach(()=>{
        server = require('../src/file');
    });

    afterEach(()=>{
        server.close();
    });

    it('should return a form in html', async (done) => {
        try {
            const html = await axios.get("http://127.0.0.1:9000/new_visitor");
            var infor = readline(html.data);

            expect(infor).toEqual(thefix);
        }
        catch(err) {
            console.log(err)
        }
        done();
    });
});

describe("testing the server", function() {
    let server;
    var Request = require("request");
    beforeAll(() => {
        server = require('../src/file')
    });
    afterAll(() => {
        server.close();
    });
    describe("get/", () => {
        var meta = {};
        beforeAll((done) => {
            Request.get("http://localhost:9000/new_visit", (error, response, body) => {
                meta.status = response.statusCode;
                meta.body = body;
                done();
            });
        });
        it("status should be 200", () => {
            expect(meta.status).toBe(200);
        });
    });
});