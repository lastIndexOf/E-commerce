const 
  vedioChildrenSchema =  require('../Schemas/vediochildren.js')
  mongoose    =  require('mongoose')

module.exports = mongoose.model('VedioChildren', vedioChildrenSchema)