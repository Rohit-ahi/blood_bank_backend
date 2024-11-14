'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DonorInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
         DonorInfo.belongsTo(models.User, {
            foreignKey : 'user', as : 'd_user'
         })
    }
  }
  DonorInfo.init({
    name:  {
      type : DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:"Name cannot be empty !"
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
    mobile:  {
      type : DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:'Mobile cannot be empty !'
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
    gender:  {
      type : DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:"Gender Cannot be Empty !"
        },
        notNull: {
          args:true,
          msg: 'Gender is required!'
        }
      }
     },
    DOB:  {
      type : DataTypes.DATE,
      validate:{
        isDate:{
          args:true,
          msg:'This field only contain date format !'
        }
      }
     },
    bloodGroup:  {
      type : DataTypes.STRING,
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
    loc_lat: DataTypes.FLOAT,
    loc_long: DataTypes.FLOAT,
    tracker_area: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'DonorInfo',
  });
  return DonorInfo;
};