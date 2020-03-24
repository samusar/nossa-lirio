const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const ministrie = request.headers.authorization;

        const events = await connection('events')
            .where('ministrie_id', ministrie)
            .select('*');

        return response.json(events);
    }
};