const
	mongoose  =  require('mongoose'),
	Schema    =  mongoose.Schema


let citySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  province: {
    type: Schema.Types.ObjectId,
    ref: 'Province'
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

citySchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.updateAt = this.meta.createdAt = new Date()
	} else {
		this.meta.updateAt = new Date()
	}

	next()
})

citySchema.methods = {}
citySchema.statics = {}

module.exports = citySchema
