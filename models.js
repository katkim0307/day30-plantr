const Sequelize = require('sequelize');
const db = new Sequelize('plantr', 'postgres', 'jh810506', {
    dialect: 'postgres',
    logging: false,
});

const Gardener = db.define('gardener', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

const Plot = db.define('plot', {
    size: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    shaded: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
});

const Vegetable = db.define('vegetable', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    planted_on: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
});

// SEQUELIZE ASSOCIATIONS
Plot.belongsTo(Gardener);
Gardener.hasOne(Plot);
Gardener.belongsTo(Vegetable, { as: 'fav_vegetable' });
// MANY-MANY ASSOCIATION W/ FOREIGN KEY
Vegetable.belongsToMany(Plot, { through: 'vegetable_plot' })
Plot.belongsToMany(Vegetable, { through: 'vegetable_plot' });

module.exports = { db, Gardener, Plot, Vegetable };