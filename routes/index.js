const router = require('express').Router()
const CustomerController = require('../controllers/customerController')

router.get('/', (req, res) => {
  res.send('ini home')
})

router.get('/customers', CustomerController.showList)

router.get('/customers/register', CustomerController.showRegisterForm)
router.post('/customers/register', CustomerController.addCustomer)

router.get('/customers/:idCustomer/editProfile', CustomerController.showEditForm)
router.post('/customers/:idCustomer/editProfile', CustomerController.editCustomer)

router.get('/customers/:idCustomer/accounts', CustomerController.showAccount)
router.post('/customers/:idCustomer/accounts', CustomerController.addAccount)

router.get('/customers/:idCustomer/accounts/:idAccount/transfer', CustomerController.showTransferForm)
router.post('/customers/:idCustomer/accounts/:idAccount/transfer', CustomerController.transferMoney)

module.exports = router