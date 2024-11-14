'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BloodRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BloodRequest.init({
    name:  {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{  
           args:true,
          msg:'Name cannot be Empty !'
      },
      notNull: {
        args:true,
        msg: 'Name is required!'
      },
        isAlpha:{
          args:true,
          msg:"Name Only contains Alphabhets"
        }
      }
     },
    mobile: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{  
          args:true,
         msg:'Mobile cannot be Empty !'
     },
     notNull: {
      args:true,
      msg: 'Mobile number is required!'
    },
        len:{
          args:[10,10],
          msg:'Mobile number contain only 10 numbers !'
       }
      }
     },
    bloodGroup: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{  
          args:true,
         msg:'Blood Group cannot be Empty !'
     },
     notNull: {
      args:true,
      msg: 'Blood Group is required!'
    }
      }
     },
    address: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{  
          args:true,
         msg:'Address cannot be Empty !'
     },
     notNull: {
      args:true,
      msg: 'Address is required!'
    }
      }
     },
    loc_lat: DataTypes.FLOAT,
    loc_long: DataTypes.FLOAT,
    reqdate: {
      type: DataTypes.DATE,
      allowNull:false,
      validate:{
        notEmpty:{  
          args:true,
         msg:'Date cannot be Empty !'
        },
        notNull: {
          args:true,
          msg: 'Request date is required!'
        },
        isDate:{
          args:true,
          msg:'This field only contain date format !'
        }
      }
     },
    reason:{
      type: DataTypes.TEXT,
      allowNull:false,
      validate:{
        notEmpty:{  
          args:true,
         msg:'Reason cannot be Empty !'
     },
     notNull: {
      args:true,
      msg: 'Reason is required!'
    }
        
      }
     },
    status:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      validate:{
        notEmpty:{  
          args:true,
         msg:'status cannot be Empty !'
     },
     notNull: {
      args:true,
      msg: 'Status is required!'
    }
      }
     },
  }, {
    sequelize,
    modelName: 'BloodRequest',
  });
  return BloodRequest;
};