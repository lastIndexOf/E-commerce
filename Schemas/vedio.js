const
	mongoose  =  require('mongoose')
	Schema    =  mongoose.Schema


let vedioSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Master'
	},
	type: [{
		type: Schema.Types.ObjectId,
		ref: 'Type'
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

vedioSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.updateAt = this.meta.createdAt = new Date()
	} else {
		this.meta.updateAt = new Date()
	}
})

vedioSchema.methods = {}
vedioSchema.statics = {}

module.exports = vedioSchema

