const
  { send }        =  require('../../utils'),
  Type            =  require('../../../Models/type.js'),
  Master          =  require('../../../Models/master.js'),
  Comment         =  require('../../../Models/comment.js'),
  Vedio           =  require('../../../Models/vedio.js'),
  VedioChildren   =  require('../../../Models/vediochildren'),
  BaseContructor  =  require('./base.js'),
  { writeFile }   =  require('fs'),
  { join }        =  require('path')

module.exports = class VedioClass extends BaseContructor {
  // Video
  static async putVedio(ctx) {
    const body = ctx.request.body

    const requiredKeys = [
      'title',
      'author',
      'type',
      'summary',
      'diffculty'
    ]

    for (let key of requiredKeys) {
      if (!(key in body))
        return ctx.body = {
          Error: '请求格式错误'
        }
    }

   if (body.avatar) {
      let avatar = body.avatar.split(/data:image\/[\w\W]+;base64,/)[1]

      try {
        await new Promise((resolve, reject) => {
          writeFile(join(__dirname,'../../../dist/vedioPosts', body.title + '-vedio.jpg'),
            Buffer.from(avatar, 'base64'), err => {
              if (err) reject(err)

              resolve()
            })
        })

        delete body.avatar
        body.avatar = `/static/vedioPosts/${ body.title }-vedio.jpg`
      } catch(e) {
        return ctx.body = {
          Error: e.message
        }
      }
    }

    const newVedio = new Vedio(body)

    try {
      const Id = await newVedio.save()
      await Promise.all([
        Type.updateMany({ _id: { $in: body.type } }, { $addToSet: { vedios: Id._id } }),
        Master.update({ _id: body.author }, { $addToSet: { own: Id._id } })
      ])

      ctx.status = 201
      return ctx.body = { Id }
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async delVedio(ctx) {
    const body = ctx.request.body

    if (!body.ids)
      return ctx.body = {
        Error: '请求格式错误'
      }

    const ids = body.ids.split('+')

    try {
      const datas = await Promise.all([
        Type.update({ vedios: { $in: ids } }, { $pull: { vedios: { $in: ids } } }),
        Comment.remove({ vedio: { $in: ids } }),
        VedioChildren.remove({ parent: { $in: ids } }),
        Vedio.remove({ _id: { $in: ids } })
      ])

      return ctx.status = 204
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async postVedio(ctx) {
    const body = ctx.request.body

    if (!body.id || !body.update || body.author)
      return ctx.body = {
        Error: '请求格式错误'
      }

    if (/data:image\/[\w\W]+;base64,/.test(body.update.avatar)) {
      let avatar = body.update.avatar.split(/data:image\/[\w\W]+;base64,/)[1]

      try {
        await new Promise((resolve, reject) => {
          writeFile(join(__dirname,'../../../dist/vedioPosts', body.update.title + '-vedio.jpg'),
            Buffer.from(avatar, 'base64'), err => {
              if (err) reject(err)

              resolve()
            })
        })

        delete body.update.avatar
        body.update.avatar = `/static/vedioPosts/${ body.update.title }-vedio.jpg`
      } catch(e) {
        return ctx.body = {
          Error: e.message
        }
      }
    }
    
    try {
      let doc
      if (body.update.type) {
        doc = await Promise.all([
          Vedio.findById({ _id: body.id }),
          Type.updateMany({ vedios: body.id }, { $pull: { vedios: body.id } })
        ])

        doc = doc[0]
        Object.assign(doc, body.update)

        await Promise.all([
          doc.save(),
          Type.updateMany({ _id: { $in: doc.type } }, { $addToSet: { vedios: body.id } })
        ])
      } else {
        doc = await Vedio.findById({ _id: body.id })
        
        Object.assign(doc, body.update)

        await Promise.all([
          doc.save(),
          Type.updateMany({ _id: { $in: doc.type } }, { $addToSet: { vedios: body.id } })
        ])
      }

      return ctx.status = 201
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async getVedio(ctx) {
    const id = ctx.params.id
    const query = ctx.request.query

    if (!query.keys) {
      if (query.populate) {
        try {
          const data = await Vedio
            .findOne({ _id: id })
            .populate('author')
            .populate('type')
            .populate('followers')
            .populate('children')
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
          const data = await Vedio.findById(id)

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
          const data = await Vedio
            .find({ _id: id })
            .populate('author')
            .populate('type')
            .populate('followers')
            .populate('children')
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
          const data = await Vedio
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

  static async getVedios(ctx) {
    const query = ctx.request.query

    if (query.ids) {
      const ids = query.ids.split('+')

      if (!query.keys) {
        if (query.populate) {
          try {
            let datas = await Vedio
              .find({ _id: { $in: ids } })
              .populate('author')
              .populate('type')
              .populate('followers')
              .populate('children')
              .populate('comment')

            const count = await Vedio.count()

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
            let datas = await Vedio
              .find({ _id: { $in: ids } })

            const count = await Vedio.count()

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
            let datas = await Vedio
              .find({ _id: { $in: ids } })
              .populate('author')
              .populate('type')
              .populate('followers')
              .populate('children')
              .populate('comment')
              .select(keys)

            const count = await Vedio.count()

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
            let datas = await Vedio
              .find({ _id: { $in: ids } })
              .select(keys)

            const count = await Vedio.count()

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
            let datas = await Vedio
              .find({})
              .populate('author')
              .populate('type')
              .populate('followers')
              .populate('children')
              .populate('comment')
              .limit(query.limit - 0)
              .skip(query.page - 1)

            const count = await Vedio.count()

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
            let datas = await Vedio
              .find({})
              .limit(query.limit - 0)
              .skip(query.page - 1)

            const count = await Vedio.count()

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
            let data = Vedio
              .find({})
              .select(keys)
              .populate('author')
              .populate('type')
              .populate('followers')
              .populate('children')
              .populate('comment')
              .limit(query.limit - 0)
              .skip(query.page - 1)

            let count = Vedio.count()

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
            let data = Vedio
              .find({})
              .select(keys)
              .limit(query.limit - 0)
              .skip(query.page - 1)

            let count = Vedio.count()

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

  // VedioChildren
  static async putChild(ctx) {
    const body = ctx.request.body

    const requiredKeys = [
      'parent',
      'title',
      'src',
      'time'
    ]

    for (let key of requiredKeys) {
      if (!(key in body))
        return ctx.body = {
          Error: '请求格式错误'
        }
    }

    const times = body.time.split(':')

    body.time = 
      (times[0] - 0) * 60 * 60 * 1000 +
      (times[1] - 0) * 60 * 1000 + 
      (times[2] - 0) * 1000

    const newChild = new VedioChildren(body)

    try {
      const Id = await newChild.save()

      await Vedio.update({ _id: Id.parent }, { $addToSet: { children: Id._id } })

      ctx.status = 201
      return ctx.body = { Id }
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async delChild(ctx) {
    const body = ctx.request.body

    if (!body.ids)
      return ctx.body = {
        Error: '请求格式错误'
      }

    const ids = body.ids.split('+')
    try {
      await Promise.all([
        Vedio.update({ children: { $in: ids } }, { $pull: { children: { $in: ids } } }),
        Comment.update({ vediochildren: { $in: ids } }, { $pull: { vediochildren: { $in: ids } } }),
        VedioChildren.remove({ _id: { $in: ids } })
      ])

      return ctx.status = 204
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async postChild(ctx) {
    const body = ctx.request.body

    if (!body.id || !body.update || body.update.parent)
      return ctx.body = {
        Error: '请求格式错误'
      }
    
    if (body.update.time) {
      const times = body.update.time.split(':')

      body.update.time = 
        (times[0] - 0) * 60 * 60 * 1000 +
        (times[1] - 0) * 60 * 1000 + 
        (times[2] - 0) * 1000
      
    }

    try {
      let doc = await VedioChildren.findOne({ _id: body.id })
      
      Object.assign(doc, body.update)

      await doc.save()

      return ctx.status = 201
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async getChild(ctx) {
    const id = ctx.params.id
    const query = ctx.request.query

    if (!query.keys) {
      if (query.populate) {
        try {
          const data = await VedioChildren
            .findById(id)
            .populate('parent')
            .populate('comment')

          const sss = data.time / 1000
          const hh = Number.parseInt(sss / 60 / 60)
          const mm = Number.parseInt((sss - hh * 60 * 60) / 60)
          const ss = Number.parseInt(sss - hh * 60 * 60 - mm * 60)

          data.time = [hh, mm, ss].join(':')

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
          const data = await VedioChildren.findById(id)

          const sss = Number.parseInt(data.time) / 1000
          const hh = Number.parseInt(sss / 60 / 60)
          const mm = Number.parseInt((sss - hh * 60 * 60) / 60)
          const ss = Number.parseInt(sss - hh * 60 * 60 - mm * 60)

          data.time = [hh, mm, ss].join(':')
          
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
          const data = await VedioChildren
            .find({ _id: id })
            .populate('parent')
            .populate('comment')
            .select(keys)
          
          if (data.time) {
            const sss = data.time / 1000
            const hh = Number.parseInt(sss / 60 / 60)
            const mm = Number.parseInt((sss - hh * 60 * 60) / 60)
            const ss = Number.parseInt(sss - hh * 60 * 60 - mm * 60)

            data.time = [hh, mm, ss].join(':')
          }

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
          const data = await VedioChildren
            .find({ _id: id })
            .select(keys)
          
          if (data.time) {
            const sss = data.time / 1000
            const hh = Number.parseInt(sss / 60 / 60)
            const mm = Number.parseInt((sss - hh * 60 * 60) / 60)
            const ss = Number.parseInt(sss - hh * 60 * 60 - mm * 60)

            data.time = [hh, mm, ss].join(':')
          }

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

  static async getChildren(ctx) {
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
            
            // const sss = data.time / 1000
            // const hh = Number.parseInt(sss / 60 / 60)
            // const mm = Number.parseInt((sss - hh * 60 * 60) / 60)
            // const ss = Number.parseInt(sss - hh * 60 * 60 - mm * 60)

            // data.time = [hh, mm, ss].join(':')

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

            // const sss = data.time / 1000
            // const hh = Number.parseInt(sss / 60 / 60)
            // const mm = Number.parseInt((sss - hh * 60 * 60) / 60)
            // const ss = Number.parseInt(sss - hh * 60 * 60 - mm * 60)

            // data.time = [hh, mm, ss].join(':')

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

            if (data.time) {
              const sss = data.time / 1000
              const hh = Number.parseInt(sss / 60 / 60)
              const mm = Number.parseInt((sss - hh * 60 * 60) / 60)
              const ss = Number.parseInt(sss - hh * 60 * 60 - mm * 60)

              data.time = [hh, mm, ss].join(':')
            }

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

            if (data.time) {
              const sss = data.time / 1000
              const hh = Number.parseInt(sss / 60 / 60)
              const mm = Number.parseInt((sss - hh * 60 * 60) / 60)
              const ss = Number.parseInt(sss - hh * 60 * 60 - mm * 60)

              data.time = [hh, mm, ss].join(':')
            }

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

          const sss = data.time / 1000
          const hh = Number.parseInt(sss / 60 / 60)
          const mm = Number.parseInt((sss - hh * 60 * 60) / 60)
          const ss = Number.parseInt(sss - hh * 60 * 60 - mm * 60)

          data.time = [hh, mm, ss].join(':')

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

          if (data.time) {
            const sss = data.time / 1000
            const hh = Number.parseInt(sss / 60 / 60)
            const mm = Number.parseInt((sss - hh * 60 * 60) / 60)
            const ss = Number.parseInt(sss - hh * 60 * 60 - mm * 60)

            data.time = [hh, mm, ss].join(':')
          }

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
