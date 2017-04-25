const
	mongoose  =  require('mongoose')
	Schema    =  mongoose.Schema


let provinceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  meta: {
    createdAt: {
      type: Date,
      default: new Date()
    },
    updateAt: {
      type: Date,
      default: new Date()
    }
  }
})

provinceSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.updateAt = this.meta.createdAt = new Date()
	} else {
		this.meta.updateAt = new Date()
	}
})

provinceSchema.methods = {}
provinceSchema.statics = {}

module.exports = provinceSchema

