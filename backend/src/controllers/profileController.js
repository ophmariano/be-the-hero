const connection = require('../database/connection')

const tableIncidents = 'incidents';
const all = '*';

module.exports = {
    async index(request, response){
        const ong_id = request.headers.authorization;

        const incidents = await connection(tableIncidents)
        .where('ong_id',ong_id)
        .select(all);

        return response.json(incidents);
    }
}