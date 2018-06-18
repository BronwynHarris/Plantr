const config = require("./config");
const Sequelize = require("sequelize")
//const db = require("./models");
const db = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.config
);

db.sync({ force: true })
    .then(() => {
        console.log("Database synced!");
        // db.close() // only if using a version of node without `finally`
    })
    .catch(err => {
        console.log("Disaster! Something went wrong! ");
        console.log(err);
        // db.close() // only if using a version of node without `finally`
    })
    .finally(() => {
        // only if using a version of node WITH `finally`
        db.close();
    });

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
        type: Sequelize.DATE
    }
});

Plot.belongsTo(Gardener);
Gardener.hasOne(Plot);

Vegetable.belongsToMany(Plot, { through: "vegetable_plot" });
Plot.belongsToMany(Vegetable, { through: "vegetable_plot" });

Gardener.belongsTo(Vegetable, { as: "favorite_vegetable" });
