const 
  commentSchema =  require('../Schemas/comment.js')
  mongoose    =  require('mongoose')

module.exports = mongoose.model('Comment', commentSchema)