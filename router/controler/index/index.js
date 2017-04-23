const
  { send }        =  require('../../utils'),
  BaseContructor  =  require('./base.js')


module.exports = class Index extends BaseContructor {
  static async homeAction(ctx) {
    await send(ctx, '/app/view/html/front/home.html')
  }

  static async vedioAction(ctx) {
    await send(ctx, '/app/view/html/front/vedio.html')
  }

  static async testAction(ctx) {
    await send(ctx, '/app/view/html/front/css.html')
  }

}