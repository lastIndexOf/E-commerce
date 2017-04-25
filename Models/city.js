const 
  citySchema =  require('../Schemas/city.js')
  mongoose    =  require('mongoose')

module.exports = mongoose.model('City', citySchema)