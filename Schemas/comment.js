const
	mongoose  =  require('mongoose'),
	Schema    =  mongoose.Schema


let commentSchema = new Schema({
  vedio: {
    type: Schema.Types.ObjectId,
    ref: 'Vedio'
  },
  vediochildren: {
    type: Schema.Types.ObjectId,
    ref: 'VedioChildren'
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    default: ''
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

commentSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.updateAt = this.meta.createdAt = new Date()
	} else {
		this.meta.updateAt = new Date()
	}

	next()
})

commentSchema.methods = {}
commentSchema.statics = {}

module.exports = commentSchema
