var Sequelize = require('sequelize');
var sequelize = new Sequelize({
    'dialect': 'sqlite',
    'storage': __dirname + '/data/dev-password-api.sqlite'
});
var passwordDb = {};
passwordDb.password = sequelize.import(__dirname + '/models/password.js');
module.exports = passwordDb;