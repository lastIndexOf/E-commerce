
const
mongoose  =  require('mongoose'),
Schema    =  mongoose.Schema


let orderSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User'
    required: true
  },
  vedio: {
    type: Schema.Types.ObjectId,
    ref: 'Vedio'
  },
  payment: {
    type: Boolean,
    default: false,
    required: true
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

orderSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.updateAt = this.meta.createdAt = new Date()
  } else {
    this.meta.updateAt = new Date()
  }
})

orderSchema.methods = {}
orderSchema.statics = {}
module.exports = orderSchema
