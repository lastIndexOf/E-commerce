const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Admin = require('./Models/admin.js')

mongoose.connect('mongodb://localhost:27017/commerce', err => {
  if (err)
    console.error(er)
  else
   console.log('connection sussecc!')
})

//Vedio.find({})
//  .skip(10)
//  .limit(10)
//  .exec((err, videos) => {
//    if (err)
//      console.error(err)
//    else {
//      console.log(videos)
//    }
//  })

new Admin({
  name: '郑凡恺',
  password: 'zhengfankai',
  username: 'zhengfankai',
  gender: '0',
  role: 99
}).save((err, admin) => {
  if (err)
    console.error(err)
  else {
    console.log(admin)
  }
})

// // const testSchema = new Schema({
// // 	name: String,
// // 	type: [
// // 		{
// // 			type: Schema.Types.ObjectId,
// // 			ref: 'Type'
// // 		}
// // 	]
// // })

// // const typeSchema = new Schema({
// // 	name: String,
// // 	test: [
// // 		{
// // 			type: Schema.Types.ObjectId,
// // 			ref: 'Test'
// // 		}
// // 	]
// // })

// // const Test = mongoose.model('Test', testSchema)
// // const Type = mongoose.model('Type', typeSchema)

// // // Test.findOne({}, (err, data) => {
// // // 	Type.update({}, { $addToSet: { test: data._id } }, err => {
// // // 		if (err)
// // // 			console.error(err)
// // // 	})

// // // })


// // Type.findOne({}, (err, type) => {
// // 	console.log(type)
// // })

// const mongoose = require('mongoose')
// const Vedio = require('./Models/vedio.js')
// const vedioChild = require('./Models/vediochildren.js')

// mongoose.connect('mongodb://localhost:27017/commerce', err => {
//   if (err)
//     console.error(er)
//   else
//    console.log('connection sussecc!')
// })

// // const arr = ["592c253d3a322270d55a0b9f", "592c25863a322270d55a0ba5", "592c25a83a322270d55a0ba8"]

// // Type.update({ _id: { $in: arr } }, { $addToSet: { vedios: '592d041c83aa3638181defba' } })

// Vedio.find({})
// 	.populate('children')
// 	.exec((err, vedios) => {
// 		console.log(vedios[0].children)
// 	})

// // Type.update({ _id: { $in: arr }}, {
// // 	$addToSet: { vedios: '592d041c83aa3638181defba' }
// // }, err => {
// // 	if (err)
// // 		console.error(err)
// // 	else
// // 		console.log('success')
// // })
