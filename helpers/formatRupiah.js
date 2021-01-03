function formatRupiah(value){
  number = +value
  return number.toLocaleString('en-ID', {style: 'currency', currency: 'IDR'});
}

module.exports = formatRupiah