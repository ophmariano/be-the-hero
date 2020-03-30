const connection = require('../database/connection');

const tableIncidents = 'incidents';
const all = '*';
module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;
        const limit = 5;
        const offset = (page - 1) * limit;

        const [count] = await connection(tableIncidents).count();

        const incidents = await connection(tableIncidents)
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(limit)
            .offset(offset)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection(tableIncidents).insert({
            title,
            description,
            value,
            ong_id,
        });

        response.json(id);
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection(tableIncidents)
            .select('ong_id')
            .where('id', id)
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection(tableIncidents).where('id', id).delete();

        return response.status(202).json({ deleted: `Incident ${id} was deleted` });
    }
}