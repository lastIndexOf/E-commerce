const
	mongoose  =  require('mongoose'),
	Schema    =  mongoose.Schema


let vedioSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	avatar: String,
	author: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Master'
	},
	type: [{
		type: Schema.Types.ObjectId,
		ref: 'Type'
	}],
	money: {
		type: Number,
		default: 0
	},
	followers: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	summary: {
		type: String,
		default: '本视频网精心推荐...'
	},
	totaltime: {
		type: String,
		default: '0小时0分0秒'
	},
	diffculty: {
		type: Number,
		default: 0
	},
	children: [{
		type: Schema.Types.ObjectId,
		ref: 'VedioChildren'
	}],
	comment: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}],
	promotion: {
		type: String,
		default: ''
	},
	isthrough: {
		type: Boolean,
		default: false
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

vedioSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.updateAt = this.meta.createdAt = new Date()
	} else {
		this.meta.updateAt = new Date()
	}

	next()
})

vedioSchema.methods = {}
vedioSchema.statics = {}

module.exports = vedioSchema
