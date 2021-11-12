const Model = require('./base');

class Room extends Model {
    static tableName = 'rooms';

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
        const User = require('../models/user');
        const TabataWorkout = require('../models/tabataWorkout')
        return {
            invited_users:{
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'rooms.id',
                    through: {
                        // invitees_rooms is the join table.
                        from: 'invitees_rooms.room_id',
                        to: 'invitees_rooms.user_id'
                    },
                    to: 'users.id'
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'rooms.room_user_host_id',
                    to: 'users.id'
                }
            },
            tabata_workouts:{
                relation: Model.BelongsToOneRelation,
                modelClass: TabataWorkout,
                join: {
                    from: 'rooms.tabata_workout_id',
                    to: 'tabata_workouts.id'
                }
            }
        };
    }
}

module.exports = Room;
