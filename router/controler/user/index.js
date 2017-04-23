const
  BaseContructor = require('./base.js')

module.exports = class User extends BaseContructor{
  static async users (ctx) {
    ctx.body = User.test()
  }


}