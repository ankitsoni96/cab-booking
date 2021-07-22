const common = require('../../utils/common')

module.exports = (sequelize, DataTypes) => {
    const Cabs = sequelize.define('cabs',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title:{
                type: DataTypes.STRING,
                allowNull: false
            },
            driver_name:{
                type: DataTypes.STRING,
                allowNull: false
            },
            latitude: {
                type: DataTypes.STRING,
                allowNull: false
            },
            longitude: {
                type: DataTypes.STRING,
                allowNull: false
            },
            is_active:{
                type: DataTypes.TINYINT,
                allowNull: false,
                defaultValue:1
            },
           car_number: {
            type: DataTypes.STRING,
            allowNull: false
           },
           car_type: {
            type: DataTypes.INTEGER,
            allowNull: false
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

    return Cabs;
}