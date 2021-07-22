const common = require('../../utils/common')

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            first_name:{
                type: DataTypes.STRING,
                allowNull: false
            },
            last_name:{
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            is_blocked: {
                type: DataTypes.ENUM,
                values: ['0', '1'],
                defaultValue: '0'
            },
            is_deleted: {
                type: DataTypes.ENUM,
                values: ['0', '1'],
                defaultValue: '0'
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

    return Users;
}