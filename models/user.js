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

    static get relationMappings() {
        const Room = require('../models/room');
        const TabataWorkout = require('../models/tabataWorkout')
        return {
            rooms: {
                relation: Model.HasManyRelation,
                modelClass: Room,
                join: {
                    from: 'users.id',
                    to: 'rooms.room_user_host_id'
                }
            },
            tabata_workouts:{
                relation: Model.HasManyRelation,
                modelClass: TabataWorkout,
                join: {
                    from: 'users.id',
                    to: 'tabata_workouts.user_id'
                }
            }
        };
    }
}

module.exports = User;
