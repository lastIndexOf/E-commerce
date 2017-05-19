const
	mongoose  =  require('mongoose'),
	Schema    =  mongoose.Schema


let typeSchema = new Schema({
  name: {
    Type: String,
    required: true
  },
  vedios: [{
    type: Schema.Types.ObjectId,
    ref: 'Vedio'
  }],
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

typeSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.updateAt = this.meta.createdAt = new Date()
	} else {
		this.meta.updateAt = new Date()
	}
})

typeSchema.methods = {}
typeSchema.statics = {}

module.exports = typeSchema
