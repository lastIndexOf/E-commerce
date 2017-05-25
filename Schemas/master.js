const
	mongoose  =  require('mongoose'),
	Schema    =  mongoose.Schema


let masterSchema = new Schema({
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: '/static/images/default.jpg'
  },
  username: String,
  name: String,
  job: String,
  gender: {
    type: Number,
    default: 2
  },
  summary: {
    type: String,
    default: '该用户很懒, 没有留下简介...'
  },
  own: [{
    type: Schema.Types.ObjectId,
    ref: 'Vedio'
  }],
  role: {
    type: Number,
    default: 0
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

masterSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.updateAt = this.meta.createdAt = new Date()
	} else {
		this.meta.updateAt = new Date()
	}

	next()
})

masterSchema.methods = {}
masterSchema.statics = {}

module.exports = masterSchema
