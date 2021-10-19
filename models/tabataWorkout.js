const Model = require('./base');

class TabataWorkout extends Model {
    static tableName = 'tabata_workouts';

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
        const Room = require('../models/room');
        const Exercise = require('../models/exercise')
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'rooms.room_user_host_id',
                    to: 'users.id'
                }
            },
            room: {
                relation: Model.BelongsToOneRelation,
                modelClass: Room,
                join: {
                    from: 'rooms.id',
                    to: 'tabata_workouts.room_id'
                }
            },
            exercises: {
                relation: Model.ManyToManyRelation,
                modelClass: Exercise,
                join: {
                    from: 'tabata_workouts.id',
                    through: {
                        // persons_movies is the join table.
                        from: 'tabata_workouts_exercises.tabata_workout_id',
                        to: 'tabata_workouts_exercises.exercise_id'
                    },
                    to: 'exercises.id'
                }
            }
        };
    }
}

module.exports = TabataWorkout;
