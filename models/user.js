const Model = require('./base');

class User extends Model {
    static tableName = 'users';

    static getTableName() {
        return this.tableName;
    }

    $beforeInsert() {
        this.created_at = new Date().toISOString();
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }

    // static get relationMappings() {
    //     const Car = require('@fitwos/fitwos-application');
    //     return {
    //         cars: {
    //             relation: Model.HasManyRelation,
    //             modelClass: Car,
    //             join: {
    //                 from: 'users.id',
    //                 to: 'cars.user_id'
    //             }
    //         }
    //     };
    // }
}

module.exports = User;
