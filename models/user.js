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
            invited_rooms: {
                relation: Model.ManyToManyRelation,
                modelClass: Room,
                join: {
                    from: 'users.user_uuid',
                    through: {
                        // invitees_rooms is the join table.
                        from: 'invitees_rooms.user_id',
                        to: 'invitees_rooms.room_id'
                    },
                    to: 'rooms.room_uuid'
                }
            },
            tabata_workouts:{
                relation: Model.HasManyRelation,
                modelClass: TabataWorkout,
                join: {
                    from: 'users.id',
                    to: 'tabata_workouts.user_id'
                }
            },
            followers: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'users.id',
                    through: {
                        // persons_movies is the join table.
                        from: 'follower_following.following_id',
                        to: 'follower_following.follower_id'
                    },
                    to: 'users.id'
                }
            },
            following: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'users.id',
                    through: {
                        // persons_movies is the join table.
                        from: 'follower_following.follower_id',
                        to: 'follower_following.following_id'
                    },
                    to: 'users.id'
                }
            }
        };
    }
}

module.exports = User;
