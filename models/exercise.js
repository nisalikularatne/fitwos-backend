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
        const Category = require('../models/category');
        return {
            categories: {
                relation: Model.ManyToManyRelation,
                modelClass: Category,
                join: {
                    from: 'exercises.id',
                    through: {
                        from: 'exercise_category.exercise',
                        to: 'exercise_category.category'
                    },
                    to: 'category.id'
                }
            }
        };
    }
}

module.exports = Exercise;
