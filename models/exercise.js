const Model = require('./base');

class Exercise extends Model {
    static tableName = 'exercises';

    static getTableName() {
        return this.tableName;
    }

    $beforeInsert() {
        this.created_at = new Date().toISOString();
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }

    static get relationMappings() {

    }
}

module.exports = Exercise;
