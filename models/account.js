'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.belongsTo(models.Customer, {foreignKey : 'customer_id'})
    }
  };
  Account.init({
    type: DataTypes.STRING,
    balance: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        min : {args : [500000], msg: 'Balance minimum adalah 500000'}
      },
    },
    accountNumber: DataTypes.STRING,
    customer_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
    hooks: {
      beforeCreate(instance, options){
        let randomNumber = (Math.floor(1000000000 + Math.random() * 9000000000))
        instance.accountNumber = randomNumber.toString()
        if(!instance.balance){
          instance.balance == '500000'
        }
      },
      // beforeCreate(instance,options){
      //   if(instance.balance == ''){
      //     instance.balance == 500.000
      //   }
      // }
    }
  });
  return Account;
};