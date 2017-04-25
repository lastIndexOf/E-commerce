const 
  masterSchema =  require('../Schemas/master.js')
  mongoose    =  require('mongoose')

module.exports = mongoose.model('Master', masterSchema)