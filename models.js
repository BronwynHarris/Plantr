const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/plantr");

const Gardener = db.define("gardener", {
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

const Plot = db.define("plot", {
    size: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    shaded: {
        type: Sequelize.BOOLEAN
    }
});

const Vegetable = db.define("vegetable", {
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    color: {
        type: Sequelize.STRING
    },
    planted_on: {
        type: Sequelize.STRING
    }
});

Plot.belongsTo(Gardener);
Gardener.hasOne(Plot);

Vegetable.belongsToMany(Plot, { through: "vegetable_plot" });
Plot.belongsToMany(Vegetable, { through: "vegetable_plot" });

Gardener.belongsTo(Vegetable, { as: "favorite_vegetable" });

module.exports = {
    db, 
    Gardener,
    Plot,
    Vegetable
}