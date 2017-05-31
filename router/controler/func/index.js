const
  { send }        =  require('../../utils'),
  User            =  require('../../../Models/user.js'),
  Admin            =  require('../../../Models/admin.js'),
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
            console.log(2)
            ctx.session.user = user
            ctx.session.password = body.password
            ctx.session.type = 'user'
            resolve()
          } else {
            reject(new Error('密码错误'))
          }
        })
      })

      user.lastmodified = new Date()
      user.password = body.password
      await user.save()
      
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

        const newUser = await User.findById(ctx.session.user._id) 

        ctx.session.user = newUser
        return ctx.body = {
          isLogin: true,
          user: ctx.session.user
        }
      }
    } else {
      return ctx.body = {
        isLogin: false,
        user: null
      }
    }
  } 

  static async logout(ctx) {
    const id = ctx.params.id

    if (ctx.session.type === 'user' || ctx.session.type === 'master') {
      if (ctx.session.user._id === id) {
        delete ctx.session.type
        delete ctx.session.password
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

  static async adminLogin(ctx) {
    const body = ctx.request.body

    try {
      let user 
      
      user = await Admin.findOne({ username: body.username })

      if (!user) {
        return ctx.body = {
          isLogin: false,
          Error: '用户不存在'
        }
      }

      await new Promise((resolve, reject) => {
        user.compareMatch(body.password, (err, match) => {
          if (err)
            reject(new Error('密码错误'))
          
          if (match) {
            ctx.session.user = user
            ctx.session.type = 'admin'
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

  static async getAdminPersonal(ctx) {
    if (ctx.session.type === 'admin') {
      if (ctx.session.user._id) {
        return ctx.body = {
          isLogin: true,
          user: ctx.session.user
        }
      }
    } else {
      return ctx.body = {
        isLogin: false,
        user: null
      }
    }
  }

  static async adminLogout(ctx) {
    const id = ctx.params.id

    if (ctx.session.type === 'admin') {
      if (ctx.session.user._id === id) {
        delete ctx.session.type
        delete ctx.session.user

        ctx.body = 
        `
          <p>正在登出...</p>
          <script>
            setTimeout(function() {
              window.location.href = '/admin'
            }, 1500)
          </script>
        `  
      }
    }
  }



  // 后台接口访问权限
  static async isAdmin(ctx, next) {
    if (!ctx.session.user) {
      return ctx.redirect('/admin')
    } 

    if (ctx.session.type === 'admin') {
      await next()
    } else {
      ctx.status = 422

      return ctx.body = 
      '<script>alert("请使用管理员账号登录");window.location.href="/"</script>'
    }
  }

  static async adminSigninManager(ctx, next) {
    if (ctx.session.type === 'admin' && ctx.session.user) {
      return ctx.redirect('/admin/user?')
    } else {
      await next()
    }
  }
}
