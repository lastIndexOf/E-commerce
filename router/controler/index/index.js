const
  path     =  require('path'),
  { send } =  require('../../utils')


module.exports = class Index {
  static async homeAction(ctx) {
    await send(ctx, '/app/view/html/home.html')
  }
}