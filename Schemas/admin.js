const
	mongoose  =  require('mongoose'),
	Schema    =  mongoose.Schema


let adminSchema = new Schema({
  password: {
    type: String,
    required: true
  },
  username: String,
  name: String,
  gender: {
    type: Number,
    default: 2
  },
  role: {
    type: Number,
    default: 50
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

adminSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.updateAt = this.meta.createdAt = new Date()
	} else {
		this.meta.updateAt = new Date()
	}

	next()
})

adminSchema.methods = {}
adminSchema.statics = {}

module.exports = adminSchema
