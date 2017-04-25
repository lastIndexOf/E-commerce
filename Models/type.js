const 
  typeSchema =  require('../Schemas/type.js')
  mongoose    =  require('mongoose')

module.exports = mongoose.model('Type', typeSchema)