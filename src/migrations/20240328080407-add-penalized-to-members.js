'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('members', 'is_penalized', {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
      Comment: '0:no penalized; 1:penalized'
    });

    await queryInterface.addColumn('members', 'penalized_end_date', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('members', 'is_penalized');
    await queryInterface.removeColumn('members', 'penalized_end_date');
  }
};
