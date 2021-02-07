module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      task: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      check: {
        type: Sequelize.BOOLEAN,
        defaultValue: false, // começa como nao concluida
        allowNull: false,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('tasks'),
};
