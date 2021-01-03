function balanceCheck(balance, amount){
  if(balance < amount){
    return res.send('InsufficientBalance')
  }
}
module.exports = balanceCheck