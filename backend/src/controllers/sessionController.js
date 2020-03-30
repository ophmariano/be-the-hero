const connection = require('../database/connection')

const tableOngs = 'ongs';
const all = '*';

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection(tableOngs)
        .where('id',id)
            .select('name')
            .first();

        if (!ong) {
            return response.status(400).json({ error: `No ONG found with ${id}.` })
        }

        return response.json(ong);
    }
}