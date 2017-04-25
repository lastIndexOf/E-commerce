const 
  userSchema =  require('../Schemas/user.js')
  mongoose    =  require('mongoose')

module.exports = mongoose.model('User', userSchema)