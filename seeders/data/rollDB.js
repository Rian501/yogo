// const {users} = require('./users.json');
const {poses} = require('./poses.json');
// const {sequences} = require('./sequences.json');
const {categories} = require('./categories.js');

let sequelize = require('sequelize');
let queryInterface = require('sequelize/lib/query-interface');

let rollDB = (queryInterface) => {
    const app = require('../app');
    const models = app.get('models');
    const server = require('../app');
    return models.sequelize.sync({force: true})
    .then( (queryInterface) => {
        return models.User.bulkCreate(Users);
    })
    .then( () => {
        return models.Payment_Type.bulkCreate(Poses);
    })
    .then( () => {
        return models.Product.bulkCreate(Sequences);
    })
    .then( () => {
        return models.Product.bulkCreate(Categories);
    })
    .catch( (err)=> {
        console.log("A problem occurred", err);
    })
};

rollDB(queryInterface);

module.exports = rollDB;