'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.hasMany(models.Account, {foreignKey: 'customer_id'})
    }
  };
  Customer.init({
    identityNumber: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {msg : 'Identity Number tidak boleh kosong !'},
        len: {args : [16,20], msg : 'Identity Number harus 16 sampai 20 digit'},
        isDuplicate(value){
          return Customer.findAll()
          .then(data => {
            data.forEach(el => {
              if(el.identityNumber == value){
                throw new Error('Identity number tidak boleh sama')
              }
            })
          })
          .catch(err => {
            throw new Error (err)
          })
        }
      }
    },
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {msg : 'Full Name harus diisi'}
      }
    },
    address: DataTypes.STRING,
    birthDate: {
      type: DataTypes.STRING,
      validate:{
        notEmpty : {msg : 'Birth Date harus diisi'}
      }
    },
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
    hooks: {
      beforeCreate(instance, options){
        if(instance.birthDate == ''){
          instance.birthDate = '2000-01-01'
        }
      },
      // beforeUpdate(instance,options){
      //   if(instance.birthDate == ''){
      //     instance.birthDate = '2000-01-01'
      //   }
      // }
    }
  });
  return Customer;
};