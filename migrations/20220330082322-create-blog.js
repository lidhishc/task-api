'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('blogs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            body: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            date_time: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('blogs')
    },
}
