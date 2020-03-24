const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const ministries = await connection('ministries').select('*');
    
        return response.json(ministries);
    },
    async create(request, response){
        // Buscar o corpo da chamada
        const {name, email, whatsapp, leader, logo} = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ministries').insert({
            id,
            name,
            email,
            whatsapp,
            leader,
            logo,
        });
        

        return response.json({ id });
    }

};