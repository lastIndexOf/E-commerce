const 
  indexPageSchema =  require('../Schemas/indexPage.js')
  mongoose        =  require('mongoose')

module.exports = mongoose.model('IndexPage', indexPageSchema)