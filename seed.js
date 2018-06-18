// const config = require("./config");
const Sequelize = require("sequelize")
const {db, Gardener, Vegetable, Plot} = require("./models");
// const db = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config.config
// );



db.sync({ force: true })
    .then(() => {
        return Promise.all([
            Vegetable.create({name: 'carrot', color: 'orange', planted_on: 'March 3rd'}),
            Vegetable.create({name: 'broccoli', color: 'green', planted_on: 'March 3rd'}),
            Vegetable.create({name: 'beet', color: 'purple', planted_on: 'March 3rd'})
        ])
    })
    .then(([carrot,broccoli,beet]) => {
        return Promise.all([
            Gardener.create({name:'Suzy', age: 28, favoriteVegetableId: carrot.id}),
            Gardener.create({name:'Simon', age: 50, favoriteVegetableId: beet.id}),
            Gardener.create({name:'Stephen', age: 89, favoriteVegetableId: broccoli.id})

        ])
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
