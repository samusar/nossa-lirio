const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { id } = request.body;

        const ministrie  = await connection('ministries')
            .where('id', id)
            .select('name')
            .first();

        if(!ministrie){
            return response.status(400).json({ error: 'No ministrie found with this ID'});
        }

        return response.json(ministrie);
    }
};