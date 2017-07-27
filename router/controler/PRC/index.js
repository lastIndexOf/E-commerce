const
  { send }  =  require('../../utils')

module.exports = class PRO {
  static async getCss(ctx) {
    await ctx.render('cssPDF', {})
  }

  static async getThreeD(ctx) {
    await send(ctx, '/app/view/html/front/3D.html')
  }
}
