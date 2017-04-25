const
	mongoose  =  require('mongoose')
	Schema    =  mongoose.Schema


let areaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City'
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

areaSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.updateAt = this.meta.createdAt = new Date()
	} else {
		this.meta.updateAt = new Date()
	}
})

areaSchema.methods = {}
areaSchema.statics = {}

module.exports = areaSchema

