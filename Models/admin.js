const 
  adminSchema =  require('../Schemas/admin.js')
  mongoose    =  require('mongoose')

module.exports = mongoose.model('Admin', adminSchema)