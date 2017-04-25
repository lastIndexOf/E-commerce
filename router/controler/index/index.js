const
  { send }        =  require('../../utils'),
  BaseContructor  =  require('./base.js')


module.exports = class Index extends BaseContructor {
  // 前端展示页面
  static async homeAction(ctx) {
    await send(ctx, '/app/view/html/front/home.html')
  }

  static async vedioAction(ctx) {
    await send(ctx, '/app/view/html/front/vedio.html')
  }

  static async testAction(ctx) {
    await send(ctx, '/app/view/html/front/css.html')
  }



  // 后台管理页面

  static async adminUserAction(ctx) {
    await send(ctx, '/app/view/html/end/components/index/index.html')
  }
  static async adminLocationAction(ctx) {
    await send(ctx, '/app/view/html/end/components/local/local.html')
  }
  static async adminVedioAction(ctx) {
    await send(ctx, '/app/view/html/end/components/room/room.html')
  }
  static async adminOtherAction(ctx) {
    await send(ctx, '/app/view/html/end/components/others/others.html')
  }

  static async notFoundAction(ctx) {
    if (ctx.status === 404) {
       ctx.body = '404 Not Found'
     }
  }

}
