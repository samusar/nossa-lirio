const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('MINISTRIE', () => {
    beforeEach(async () => {
        await connection.migrate.latest();
    });

    it('should be able to create a new MInistrie', async () => {
        const response = await request(app)
            .post('ministrie')
            .send({
                name    : "Ministério de Dança",
                email   : "sarasamu16@gmail.com",
                whatsapp: "31992098372",
                leader  : "Sara Duque",
                logo    : "logo_musica.png"
            });

        console.log(response.body);
    });
});