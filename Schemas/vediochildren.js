const
	mongoose  =  require('mongoose'),
	Schema    =  mongoose.Schema


let vedioChildrenSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	parent: {
    type: Schema.Types.ObjectId,
    ref: 'Vedio'
  },
  src: {
    type: String,
    required: true
  },
  comment: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
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

vedioChildrenSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.updateAt = this.meta.createdAt = new Date()
	} else {
		this.meta.updateAt = new Date()
	}
})

vedioChildrenSchema.methods = {}
vedioChildrenSchema.statics = {}

module.exports = vedioChildrenSchema
