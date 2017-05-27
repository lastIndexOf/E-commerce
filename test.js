const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/TestMongo', err => {
  if (err)
    console.error(er)
  else
   console.log('connection sussecc!')
})

const testSchema = new Schema({
	name: String,
	type: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Type'
		}
	]
})

const typeSchema = new Schema({
	name: String,
	test: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Test'
		}
	]
})

const Test = mongoose.model('Test', testSchema)
const Type = mongoose.model('Type', typeSchema)

// Test.findOne({}, (err, data) => {
// 	Type.update({}, { $addToSet: { test: data._id } }, err => {
// 		if (err)
// 			console.error(err)
// 	})
	
// })


Type.findOne({}, (err, type) => {
	console.log(type)
})