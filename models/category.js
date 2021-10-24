const Model = require('./base');

class Category extends Model {
    static tableName = 'category';

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
        const Exercise = require('../models/exercise');
        return {
            exercises: {
                relation: Model.ManyToManyRelation,
                modelClass: Exercise,
                join: {
                    from: 'category.id',
                    through: {
                        // persons_movies is the join table.
                        from: 'exercise_category.category',
                        to: 'exercise_category.exercise'
                    },
                    to: 'exercises.id'
                }
            }
        };
    }
}

module.exports = Category;
