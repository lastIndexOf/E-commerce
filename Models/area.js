const 
  areaSchema =  require('../Schemas/area.js')
  mongoose    =  require('mongoose')

module.exports = mongoose.model('Area', areaSchema)