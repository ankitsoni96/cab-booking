const common = require('../../utils/common')

module.exports = (sequelize, DataTypes) => {
    const Bookings = sequelize.define('bookings',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            current_lat: {
                type: DataTypes.STRING,
                allowNull: false
            },
            current_long: {
                type: DataTypes.STRING,
                allowNull: false
            },
            destination_lat: {
                type: DataTypes.STRING,
                allowNull: false
            },
            destination_long: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status:{
                type: DataTypes.TINYINT,
                allowNull: false,
                defaultValue:0
            },
            created_at: {
                type: DataTypes.INTEGER,
                defaultValue: common.getCurrentDateNTimeStamp().timestamp,
                allowNull: false
            },
            updated_at: {
                type: DataTypes.INTEGER,
                defaultValue: common.getCurrentDateNTimeStamp().timestamp,
                allowNull: false
            },
        }
    );
    Bookings.associate = (models) => {
        Bookings.belongsTo(models.users, {foreignKey:"user_id"});
        Bookings.belongsTo(models.cabs, { foreignKey:"cab_id"});

    };

    return Bookings;
}