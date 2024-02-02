const { Model, DataTyoes } = require('sequelize');
const bcrypt = require('bcrypt');
const Sequelize = require('../config/connection');

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true // Ensure the value is a valid email address
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8, Infinity],
                msg: 'Password must be at least 8 characters long'
            },
            containsSymbol(value) {
                if (!/\W/.test(value)) {
                    throw new Error('Password must contain at least one symbol');
                }
            }
        }
    },
},
    {
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, 10);
                return user;
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
                return user;
            },
        },
        sequelize,
        modelName: 'user',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    });

module.exports = User;