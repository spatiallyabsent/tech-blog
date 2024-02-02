const { Model, DataTyoes } = require('sequelize');
const Sequelize = require('../config/connection');

class User extends Model {}

User.init({
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
    // add more here as we fill out more info. Delete this message later
  }, {
    sequelize,
    modelName: 'user'
  });
  
  module.exports = User;