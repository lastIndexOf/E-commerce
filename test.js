const mongoose = require('mongoose')
const City = require('./Models/city.js')
const Province = require('./Models/province.js')

mongoose.connect('mongodb://localhost:27017/commerce', err => {
  if (err)
    console.error(er)
  else
   console.log('connection sussecc!')
})



City.find({})
  .populate('province', 'name _id')
  .exec((err, datas) => {
    console.log(datas)
  })
