module.exports = function(sequelize, DataTypes){
    return sequelize.define('password', {
        account: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRINg,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id: {
            allowNull: true,
            type: DataTypes.INTEGER
        }
    });
}