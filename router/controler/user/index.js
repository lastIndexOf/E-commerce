const
  { send }        =  require('../../utils'),
  User            =  require('../../../Models/user.js'),
  Master          =  require('../../../Models/master.js'),
  Admin           =  require('../../../Models/admin.js'),
  Vedio           =  require('../../../Models/vedio.js'),
  BaseContructor  =  require('./base.js'),
  { writeFile }   =  require('fs'),
  { join }        =  require('path')

module.exports = class UserClass extends BaseContructor {
  // User
  static async putUser(ctx) {
    const body = ctx.request.body

    const requiredKeys = [
      'username',
      'email',
      'password',
      'gender'
    ]
    
    for (let key of requiredKeys) {
      if (!(key in body))
        return ctx.body = {
          Error: '请求格式错误'
        }
    }

    try {
      const datas = await User.find({ 
        username: { $in: body.username },
        email: { $in: body.email } 
      })

      if (datas.length > 0) {
        ctx.status = 403

        return ctx.body = {
          Error: '用户名已存在'
        }
      }
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }

    const newUser = new User(body)

    try {
      const Id = await newUser.save()
      ctx.status = 201
      return ctx.body = { Id }
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async delUser(ctx) {
    ctx.body = {
      Error: '不允许删除用户'
    }
  }

  static async postUser(ctx) {
    const body = ctx.request.body

    if (!body.id || !body.update)
      return ctx.body = {
        Error: '请求格式错误'
      }

    if (body.update.avatar) {

      if (/data:image\/[\w\W]+;base64,/.test(body.update.avatar)) {
        let avatar = body.update.avatar.split(/data:image\/[\w\W]+;base64,/)[1]

        try {
          await new Promise((resolve, reject) => {
            writeFile(join(__dirname,'../../../dist/avatars', body.update.username + '-avatar.jpg'),
              Buffer.from(avatar, 'base64'), err => {
                if (err) reject(err)

                resolve()
              })
          })

          delete body.update.avatar
          body.update.avatar = `/static/avatars/${ body.update.username }-avatar.jpg`
        } catch(e) {
          return ctx.body = {
            Error: e.message
          }
        }
      }

    }
    
    try {
      let doc = await User.findById({ _id: body.id })

      Object.assign(doc, body.update)

      doc.password = ctx.session.password
      await doc.save()

      return ctx.status = 201
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async getUser(ctx) {
    const id = ctx.params.id
    const query = ctx.request.query

    if (!query.keys) {
      if (query.populate) {
        try {
          const data = await User
            .findById(id)
            .populate('area')
            .populate('shopcar')
            .populate('ownedvedios')
          
          return ctx.body = {
            Total: 1,
            ResultList: [ data ]
          }
        } catch(e) {
          return ctx.body = {
            Error: e.message
          }
        }
      } else {
        try {
          const data = await User.findById(id)

          return ctx.body = {
            Total: 1,
            ResultList: [ data ]
          }
        } catch(e) {
          return ctx.body = {
            Error: e.message
          }
        }
      }
    } else {
      const keys = query.keys.split('+').join(' ')

      if (query.populate) {
        try {
          const data = await User
            .find({ _id: id })
            .populate('area')
            .populate('shopchar')
            .populate('ownedvedios')
            .select(keys)

          return ctx.body = {
            Total: 1,
            ResultList: data
          }
        } catch(e) {
          return ctx.body = {
            Error: e.message
          }
        }
      } else {
        try {
          const data = await User
            .find({ _id: id })
            .select(keys)

          return ctx.body = {
            Total: 1,
            ResultList: data
          }
        } catch(e) {
          return ctx.body = {
            Error: e.message
          }
        }
      }
    }

  }

  static async getUsers(ctx) {
    const query = ctx.request.query

    if (query.ids) {
      const ids = query.ids.split('+')

      if (!query.keys) {
        if (query.populate) {
          try {
            let datas = await User
              .find({ _id: { $in: ids } })
              .populate('area')
              .populate('shopchar')
              .populate('ownedvedios')

            const count = await User.count()

            return ctx.body = {
              Total: count,
              ResultList: datas
            }
          } catch(e) {
            return ctx.body = {
              Error: e.message
            }
          }
        } else {
          try {
            let datas = await User
              .find({ _id: { $in: ids } })

            const count = await User.count()

            return ctx.body = {
              Total: count,
              ResultList: datas
            }
          } catch(e) {
            return ctx.body = {
              Error: e.message
            }
          }
        }
      } else {
        const keys = query.keys.split('+').join(' ')

        if (query.populate) {
          try {
            let datas = await User
              .find({ _id: { $in: ids } })
              .populate('area')
              .populate('shopchar')
              .populate('ownedvedios')
              .select(keys)

            const count = await User.count()

            return ctx.body = {
              Total: count,
              ResultList: datas
            }
          } catch(e) {
            return ctx.body = {
              Error: e.message
            }
          }
        } else {
          try {
            let datas = await User
              .find({ _id: { $in: ids } })
              .select(keys)

            const count = await User.count()

            return ctx.body = {
              Total: count,
              ResultList: datas
            }
          } catch(e) {
            return ctx.body = {
              Error: e.message
            }
          }
        }
      }
    } else if (!query.limit || !query.page) {
      return ctx.body = {
        Error: '请求格式错误'
      }
    } else {
      if (!query.keys) {
        if (query.populate) {
          try {
            let datas = await User
              .find({})
              .populate('area')
              .populate('shopchar')
              .populate('ownedvedios')
              .limit(query.limit - 0)
              .skip(query.page - 1)

            const count = await User.count()

            return ctx.body = {
              Total: count,
              ResultList: datas
            }
          } catch(e) {
            return ctx.body = {
              Error: e.message
            }
          }
        } else {
          try {
            let datas = await User
              .find({})
              .limit(query.limit - 0)
              .skip(query.page - 1)

            const count = await User.count()

            return ctx.body = {
              Total: count,
              ResultList: datas
            }
          } catch(e) {
            return ctx.body = {
              Error: e.message
            }
          }
        }
      } else {
        const keys = query.keys.split('+').join(' ')

        if (query.populate) {
          try {
            let data = User
              .find({})
              .select(keys)
              .populate('area')
              .populate('shopchar')
              .populate('ownedvedios')
              .limit(query.limit - 0)
              .skip(query.page - 1)

            let count = User.count()

            let datas = await Promise.all([data, count])

            return ctx.body = {
              Total: datas[1],
              ResultList: datas[0]
            }
          } catch(e) {
            return ctx.body = {
              Error: e.message
            }
          }
        } else {
          try {
            let data = User
              .find({})
              .select(keys)
              .limit(query.limit - 0)
              .skip(query.page - 1)

            let count = User.count()

            let datas = await Promise.all([data, count])

            return ctx.body = {
              Total: datas[1],
              ResultList: datas[0]
            }
          } catch(e) {
            return ctx.body = {
              Error: e.message
            }
          }
        }
      }
    }
  }

  // Master
  static async putMaster(ctx) {
    const body = ctx.request.body
    const requiredKeys = [
      'username',
      'password',
      'gender'
    ]

    for (let key of requiredKeys) {
      if (!(key in body))
        return ctx.body = {
          Error: '请求格式错误'
        }
    }

     try {
      const datas = await Master.find({ 
        username: { $in: body.username }
      })

      if (datas.length > 0) {
        ctx.status = 403

        return ctx.body = {
          Error: '用户名已存在'
        }
      }
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }

    if (body.avatar) {
      let avatar = body.avatar.split(/data:image\/[\w\W]+;base64,/)[1]

      try {
        await new Promise((resolve, reject) => {
          writeFile(join(__dirname,'../../../dist/avatars', body.username + '-avatar.jpg'),
            Buffer.from(avatar, 'base64'), err => {
              if (err) reject(err)

              resolve()
            })
        })

        delete body.avatar
        body.avatar = `/static/avatars/${ body.username }-avatar.jpg`
      } catch(e) {
        return ctx.body = {
          Error: e.message
        }
      }
    }

    const newMaster = new Master(body)

    try {
      const Id = await newMaster.save()
      
      ctx.status = 201
      return ctx.body = { Id }
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async delMaster(ctx) {
    ctx.status = 422
    
    ctx.body = {
      Error: '不允许删除高级用户信息'
    }
  }

  static async postMaster(ctx) {
    const body = ctx.request.body

    if (!body.id || !body.update)
      return ctx.body = {
        Error: '请求格式错误'
      }

    if (body.update.avatar) {
      let avatar = body.update.avatar.split(/data:image\/[\w\W]+;base64,/)[1]

      try {
        await new Promise((resolve, reject) => {
          writeFile(join(__dirname,'../../../dist/avatars', body.update.username + '-avatar.jpg'),
            Buffer.from(avatar, 'base64'), err => {
              if (err) reject(err)

              resolve()
            })
        })

        delete body.update.avatar
        body.update.avatar = `/static/avatars/${ body.update.username }-avatar.jpg`
      } catch(e) {
        return ctx.body = {
          Error: e.message
        }
      }
    }
    
    try {
      let doc = await Master.findById({ _id: body.id })

      Object.assign(doc, body.update)

      await doc.save()

      return ctx.status = 201
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async getMaster(ctx) {
    const id = ctx.params.id
    const query = ctx.request.query

    if (!query.keys) {
      if (query.populate) {
        try {
          const data = await Master
            .findById(id)
            .populate('own')

          return ctx.body = {
            Total: 1,
            ResultList: [ data ]
          }
        } catch(e) {
          return ctx.body = {
            Error: e.message
          }
        }
      } else {
        try {
          const data = await Master.findById(id)

          return ctx.body = {
            Total: 1,
            ResultList: [ data ]
          }
        } catch(e) {
          return ctx.body = {
            Error: e.message
          }
        }
      }
    } else {
      const keys = query.keys.split('+').join(' ')

      if (query.populate) {
        try {
          const data = await Master
            .find({ _id: id })
            .populate('own')
            .select(keys)

          return ctx.body = {
            Total: 1,
            ResultList: data
          }
        } catch(e) {
          return ctx.body = {
            Error: e.message
          }
        }
      } else {
        try {
          const data = await Master
            .find({ _id: id })
            .select(keys)

          return ctx.body = {
            Total: 1,
            ResultList: data
          }
        } catch(e) {
          return ctx.body = {
            Error: e.message
          }
        }
      }
    }

  }

  static async getMasters(ctx) {
    const query = ctx.request.query

    if (query.ids) {
      const ids = query.ids.split('+')

      if (!query.keys) {
        if (query.populate) {
          try {
            let datas = await Master
              .find({ _id: { $in: ids } })
              .populate('own')

            const count = await Master.count()

            return ctx.body = {
              Total: count,
              ResultList: datas
            }
          } catch(e) {
            return ctx.body = {
              Error: e.message
            }
          }
        } else {
          try {
            let datas = await Master.find({ _id: { $in: ids } })

            const count = await Master.count()

            return ctx.body = {
              Total: count,
              ResultList: datas
            }
          } catch(e) {
            return ctx.body = {
              Error: e.message
            }
          }
        }
      } else {
        const keys = query.keys.split('+').join(' ')

        if (query.populate) {
          try {
            let datas = await Master
              .find({ _id: { $in: ids } })
              .populate('own')
              .select(keys)

            const count = Master.count()

            return ctx.body = {
              Total: count,
              ResultList: datas
            }
          } catch(e) {
            return ctx.body = {
              Error: e.message
            }
          }
        } else {
          try {
            let datas = await Master
              .find({ _id: { $in: ids } })
              .select(keys)

            const count = await Master.count()

            return ctx.body = {
              Total: count,
              ResultList: datas
            }
          } catch(e) {
            return ctx.body = {
              Error: e.message
            }
          }
        }
      }
    } else if (!query.limit || !query.page) {
      return ctx.body = {
        Error: '请求格式错误'
      }
    } else {
      if (!query.keys) {
        try {
          let datas
          if (query.populate) {
            datas = await Master
              .find({})
              .limit(query.limit - 0)
              .skip(query.page - 1)
              .populate('own')
          } else {
            datas = await Master
              .find({})
              .limit(query.limit - 0)
              .skip(query.page - 1)
          }

          const count = await Master.count()

          return ctx.body = {
            Total: count,
            ResultList: datas
          }
        } catch(e) {
          return ctx.body = {
            Error: e.message
          }
        }
      } else {
        const keys = query.keys.split('+').join(' ')

        try {
          let data
          if (query.populate) {
            data = Master
              .find({})
              .populate('own')
              .select(keys)
              .limit(query.limit - 0)
              .skip(query.page - 1)
          } else {
            data = Master
              .find({})
              .select(keys)
              .limit(query.limit - 0)
              .skip(query.page - 1)
          }

          let count = await Master.count()

          let datas = await Promise.all([data, count])

          return ctx.body = {
            Total: datas[1],
            ResultList: datas[0]
          }
        } catch(e) {
          return ctx.body = {
            Error: e.message
          }
        }
      }
    }
  }

  // Admin
  static async putAdmin(ctx) {
    const body = ctx.request.body

    const requiredKeys = [
      'parent',
      'title',
      'src'
    ]

    for (let key of requiredKeys) {
      if (!(key in body))
        return ctx.body = {
          Error: '请求格式错误'
        }
    }

    const newChild = new VedioChildren(body)

    try {
      const Id = await newChild.save()
      ctx.status = 201
      return ctx.body = { Id }
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async delAdmin(ctx) {
    const body = ctx.request.body

    if (!body.ids)
      return ctx.body = {
        Error: '请求格式错误'
      }

    const ids = body.ids.split('+')
    try {
      await VedioChildren.remove({ _id: { $in: ids } })

      return ctx.status = 204
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async postAdmin(ctx) {
    const body = ctx.request.body

    if (!body.id || !body.update)
      return ctx.body = {
        Error: '请求格式错误'
      }

    try {
      let doc = await VedioChildren.findById({ _id: body.id })

      Object.assign(doc, body.update)

      await doc.save()

      return ctx.status = 201
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async getAdmin(ctx) {
    const id = ctx.params.id
    const query = ctx.request.query

    if (!query.keys) {
      if (query.populate) {
        try {
          const data = await City
            .findById(id)
            .populate('parent')
            .populate('comment')

          return ctx.body = {
            Total: 1,
            ResultList: [ data ]
          }
        } catch(e) {
          return ctx.body = {
            Error: e.message
          }
        }
      } else {
        try {
          const data = await City.findById(id)

          return ctx.body = {
            Total: 1,
            ResultList: [ data ]
          }
        } catch(e) {
          return ctx.body = {
            Error: e.message
          }
        }
      }
    } else {
      const keys = query.keys.split('+').join(' ')

      if (query.populate) {
        try {
          const data = await City
            .find({ _id: id })
            .populate('parent')
            .populate('comment')
            .select(keys)

          return ctx.body = {
            Total: 1,
            ResultList: data
          }
        } catch(e) {
          return ctx.body = {
            Error: e.message
          }
        }
      } else {
        try {
          const data = await City
            .find({ _id: id })
            .select(keys)

          return ctx.body = {
            Total: 1,
            ResultList: data
          }
        } catch(e) {
          return ctx.body = {
            Error: e.message
          }
        }
      }
    }

  }

  static async getAdmins(ctx) {
    const query = ctx.request.query

    if (query.ids) {
      const ids = query.ids.split('+')

      if (!query.keys) {
        if (query.populate) {
          try {
            let datas = await VedioChildren
              .find({ _id: { $in: ids } })
              .populate('parent')
              .populate('comment')

            return ctx.body = {
              Total: datas.length,
              ResultList: datas
            }
          } catch(e) {
            return ctx.body = {
              Error: e.message
            }
          }
        } else {
          try {
            let datas = await VedioChildren.find({ _id: { $in: ids } })

            return ctx.body = {
              Total: datas.length,
              ResultList: datas
            }
          } catch(e) {
            return ctx.body = {
              Error: e.message
            }
          }
        }
      } else {
        const keys = query.keys.split('+').join(' ')

        if (query.populate) {
          try {
            let datas = await VedioChildren
              .find({ _id: { $in: ids } })
              .populate('parent')
              .populate('comment')
              .select(keys)

            return ctx.body = {
              Total: datas.length,
              ResultList: datas
            }
          } catch(e) {
            return ctx.body = {
              Error: e.message
            }
          }
        } else {
          try {
            let datas = await VedioChildren
              .find({ _id: { $in: ids } })
              .select(keys)

            return ctx.body = {
              Total: datas.length,
              ResultList: datas
            }
          } catch(e) {
            return ctx.body = {
              Error: e.message
            }
          }
        }
      }
    } else if (!query.limit || !query.page) {
      return ctx.body = {
        Error: '请求格式错误'
      }
    } else {
      if (!query.keys) {
        try {
          let datas
          if (query.populate) {
            datas = await VedioChildren
              .find({})
              .limit(query.limit - 0)
              .skip(query.page - 1)
              .populate('parent')
              .populate('comment')
          } else {
            datas = await VedioChildren
              .find({})
              .limit(query.limit - 0)
              .skip(query.page - 1)
          }

          const count = await VedioChildren.count()

          return ctx.body = {
            Total: count,
            ResultList: datas
          }
        } catch(e) {
          return ctx.body = {
            Error: e.message
          }
        }
      } else {
        const keys = query.keys.split('+').join(' ')

        try {
          let data
          if (query.populate) {
            data = VedioChildren
              .find({})
              .populate('parent')
              .populate('comment')
              .select(keys)
              .limit(query.limit - 0)
              .skip(query.page - 1)
          } else {
            data = VedioChildren
              .find({})
              .select(keys)
              .limit(query.limit - 0)
              .skip(query.page - 1)
          }

          let count = await VedioChildren.count()

          let datas = await Promise.all([data, count])

          return ctx.body = {
            Total: datas[1],
            ResultList: datas[0]
          }
        } catch(e) {
          return ctx.body = {
            Error: e.message
          }
        }
      }
    }
  }

}
