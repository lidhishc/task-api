'use strict'
const { Model, DataTypes } = require('sequelize')
module.exports = (sequelize) => {
    class blog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            blog.hasMany(models.comments, {
                foreignKey: 'blog_id',
                as: 'blogs',
            })
        }
    }
    blog.init(
        {
            title: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            body: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            date_time: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
        },
        {
            sequelize,
            modelName: 'blog',
        }
    )
    return blog
}
