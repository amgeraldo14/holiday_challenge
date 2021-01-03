const Customer = require('../models/index').Customer
const Account = require('../models/index').Account
class CustomerController{
  static showList(req,res){
    Customer.findAll({
      order: [['fullName', 'ASC']]
    })
    .then(data => {
      res.render('customer-list.ejs', {customers : data})
    })
    .catch(err => {
      res.send(err.message)
    })
  }
  static showRegisterForm(req,res){
    res.render('register-form.ejs')
  }
  static addCustomer(req,res){
    let newCustomer = {
      identityNumber: req.body.identityNumber,
      fullName: req.body.fullName,
      address: req.body.address,
      birthDate: req.body.birthDate,
      gender: req.body.gender
    }
    Customer.create(newCustomer)
    .then(data => {
      res.redirect('/customers')
    })
    .catch(err => {
      res.send (err.message)
    })
  }
  static showEditForm(req, res){
    Customer.findAll({
      where: {id : req.params.idCustomer}
    })
    .then(data => {
      res.render('edit-form.ejs', {data : data[0]})
    })
    .catch(err => {
      res.send(err.message)
    })
    // res.render('edit-form.ejs')
  }
  static editCustomer(req,res){
    let updatedData = {
      identityNumber: req.body.identityNumber,
      fullName: req.body.fullName,
      address: req.body.address,
      birthDate: req.body.birthDate,
      gender: req.body.gender
    }
    Customer.update(updatedData, {
      where: {id : req.params.idCustomer}
    })
    .then(data =>{
      res.redirect('/customers')
    })
    .catch(err => {
      res.send(err.message)
    })
  }
  static showAccount(req,res){
    Customer.findAll({
      include: [Account],
      where: {id : req.params.idCustomer}
    })
    .then(data => {
      res.render('view-and-add-account.ejs', {data : data[0]})
    })
    .catch(err => {
      res.send (err.message)
    })
  }
  static addAccount(req,res){
    let account = {
      type : req.body.type,
      balance : req.body.balance,
      customer_id: req.params.idCustomer
    }
    Account.create(account)
    .then(data => {
      res.redirect(`/customers/${req.params.idCustomer}/accounts`)
    })
    .catch(err => {
      res.send(err.message)
    })
  }
  static showTransferForm(req,res){
    let customer
    Customer.findAll({
      include: [Account],
      
    })
    .then(data => {
      customer = data
      return Account.findAll({
        where: {id : req.params.idAccount}
      })
    })
    .then(data => {
      res.render ('transfer-form.ejs', {customer, account : data, id: req.params.idCustomer})
    })
    .catch(err => {
      res.send(err.message)
    })
  }
  static transferMoney(req,res){
    let newTargetData = {}
    let newData = {}
    Account.findOne({where: {id : req.body.target}})
    .then(data => {
      if(+data.balance < +req.body.amount){
        res.send('Insufficient Balance')
      } else{
        let targetNewBalance = (+data.balance + +req.body.amount).toString()
        newTargetData = {
          type: data.type,
          balance: targetNewBalance,
          accountNumber: data.accountNumber,
          customer_id: data.customer_id
        }
        return Account.update(newTargetData, {
          where: {id : req.body.target}
        })
      }
    })
    .then(data => {
      return Account.findOne({where: {id: req.params.idAccount}})
    })
    .then(data => {
      let newBalance = (+data.balance - +req.body.amount).toString()
      newData = {
        type: data.type,
        balance: newBalance,
        accountNumber: data.accountNumber,
        customer_id: data.customer_id
      }
      return Account.update(newData, {
        where: {id : req.params.idAccount}
      })
    })
    .then(data => {
      res.redirect(`/customers/${req.params.idCustomer}/accounts`)
    })
    .catch(err => {
      res.send(err.message)
    })
  }
}

module.exports = CustomerController