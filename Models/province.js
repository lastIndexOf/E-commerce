const 
  provinceSchema =  require('../Schemas/province.js')
  mongoose    =  require('mongoose')

module.exports = mongoose.model('Province', provinceSchema)