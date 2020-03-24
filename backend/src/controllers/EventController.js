const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('events').count();

        const events = await connection('events')
            .join('ministries', 'ministries.id', '=', 'events.ministrie_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'events.*',
                'ministries.name',
                'ministries.email',
                'ministries.whatsapp',
                'ministries.leader',
                
            ]);


        // A quantidade total deverá ser indicada no cabeçalho da requisição
        response.header('X-Total-Count', count['count(*)']);

        return response.json(events);
    },
    async create (request, response) {
        const {title, description, address, value} = request.body;
        const ministrie_id = request.headers.authorization;

        const [id] = await connection('events').insert({
            title,
            description,
            address,
            value,
            ministrie_id,
        });

        return response.json({ id });
    },
    async delete(request, response){
        const { id } = request.params;

        const ministrie_id = request.headers.authorization;

        const event = await connection('events')
        .where('id', id)
        .select('ministrie_id')
        .first();

        if( event.ministrie_id != ministrie_id){
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('events').where('id', id).delete();

        return response.status(204).send();
    }
};