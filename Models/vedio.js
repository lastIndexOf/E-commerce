const 
  vedioSchema =  require('../Schemas/vedio.js')
  mongoose    =  require('mongoose')

module.exports = mongoose.model('Vedio', vedioSchema)