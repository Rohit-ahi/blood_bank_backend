'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FamilyMembers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       FamilyMembers.belongsTo(models.User,{
          foreignKey:'user',as:'f_user'
       })
    }
  }
  FamilyMembers.init({
    name: {
      type : DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
            msg:'Name cannot be Empty !'
        },
        notNull: {
          args:true,
          msg: 'name is required!'
        },
        isAlpha:{
          args:true,
            msg:"Name Only contains Alphabhets"
        }
      }
     },
    mobile: {
      type : DataTypes.STRING,
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
    gender: {
      type : DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{   
          args:true,
          msg:'Gender cannot be Empty !'
      },
      notNull: {
        args:true,
        msg: 'Gender is required!'
      },
      }
     },
    DOB:{
      type : DataTypes.DATE,
      allowNull:false,
      validate:{
        notEmpty:{   
          args:true,
          msg:'Date of Birth cannot be Empty !'
      },
      notNull: {
        args:true,
        msg: 'Date of birth is required!'
      },
        isDate:{
          args:true,
          msg:'This field only contain date format !'
        }
      }
     },
    bloodGroup: {
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
      },
      }
     },
    relation:{
      type : DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{   
          args:true,
          msg:'Relation cannot be Empty !'
      },
      notNull: {
        args:true,
        msg: 'relation is required!'
      }
      }
     },
  }, {
    sequelize,
    modelName: 'FamilyMembers',
  });
  return FamilyMembers;
};