const Model = require('./base');

class Notification extends Model {
    static tableName = 'notifications';

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
        const Room = require('../models/room')
        return {
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'notifications.notification_uuid',
                    through: {
                        from: 'users_notifications.notification_id',
                        to: 'users_notifications.user_id'
                    },
                    to: 'users.user_uuid'
                }
            },
            room:{
                relation: Model.BelongsToOneRelation,
                modelClass: Room,
                join: {
                    from: 'rooms.room_uuid',
                    to: 'notifications.room_uuid'
                }
            }
        };
    }
}

module.exports = Notification;
