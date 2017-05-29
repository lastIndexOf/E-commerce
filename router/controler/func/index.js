const
  { send }        =  require('../../utils'),
  User            =  require('../../../Models/user.js')
  BaseContructor  =  require('./base.js')

module.exports = class Func extends BaseContructor {

  static async login(ctx) {
    const body = ctx.request.body

    try {
      let user 
      
      user = await User.findOne({ username: body.username })

      if (!user) {
        user = await User.findOne({ email: body.username })
      }

      if (!user) {
        return ctx.body = {
          isLogin: false,
          Error: '用户不存在'
        }
      }

      await new Promise((resolve, reject) => {
        user.compareMatch(body.password, (err, match) => {
          if (err)
            reject()
          
          if (match) {
            ctx.session.user = user
            ctx.session.type = 'user'
            resolve()
          }
        })
      })

      return ctx.body = {
        isLogin: true,
        user: user
      }
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async getPersonal(ctx) {
    if (ctx.session.type === 'user' || ctx.session.type === 'master') {
      if (ctx.session.user._id) {
        return ctx.body = {
          isLogin: true,
          user: ctx.session.user
        }
      }
    }
  } 

  static async logout(ctx) {
    const id = ctx.params.id

    if (ctx.session.type === 'user' || ctx.session.type === 'master') {
      if (ctx.session.user._id === id) {
        delete ctx.session.type
        delete ctx.session.user

        ctx.body = 
        `
          <p>正在登出...</p>
          <script>
            setTimeout(function() {
              window.location.href = '/'
            }, 1500)
          </script>
        `  
      }
    }
  }

  
}
