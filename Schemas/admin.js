const
	mongoose  =  require('mongoose'),
	bcrypt    =  require('bcrypt'),
	Schema    =  mongoose.Schema

const SALT_SAFE = 10


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

	bcrypt.genSalt(SALT_SAFE, (err, salt) => {
    if (err) 
      return next(err)

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) 
        return next(err)

      this.password = hash
      
      next()
    })
  })
})

adminSchema.methods = {}
adminSchema.statics = {}

module.exports = adminSchema
