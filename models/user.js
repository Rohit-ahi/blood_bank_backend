'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       
    }
  }
  User.init({
    email: {
      type : DataTypes.STRING,
     allowNull:false,
     validate:{
       notEmpty:{
        args:true,
        msg:'email cannot be empty'
       },
       notNull: {
        args:true,
        msg: 'email is required!'
      },
       isEmail:{
         args:true,
         msg:"Please Enter Email !"
       }

     }
    },
    password:  {
      type : DataTypes.STRING,
      validate:{
        len:{
           args:[7,14],
           msg:'Password length should be between 7 to 14 characters'
        }
      }
     },
    role:  {
      type : DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:'role cannot be empty ! Please Select Appropriate role'
        },
        notNull: {
          args:true,
          msg: 'role is required!'
        },
      }
     },
     status:{
      type : DataTypes.BOOLEAN,
      allowNull:false,
      validate:{
        notEmpty:{  
          args:true,
         msg:'status cannot be Empty !'
     },
     notNull: {
      args:true,
      msg: 'status is required!'
    },
      }
     },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};