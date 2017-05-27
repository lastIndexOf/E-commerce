const
  { send }        =  require('../../utils'),
  Type            =  require('../../../Models/type.js'),
  Comment         =  require('../../../Models/comment.js'),
  Vedio           =  require('../../../Models/vedio.js'),
  VedioChildren   =  require('../../../Models/vediochildren'),
  BaseContructor  =  require('./base.js')

module.exports = class Location extends BaseContructor {
  // Video
  static async putVedio(ctx) {
    const body = ctx.request.body

    const requiredKeys = [
      'title',
      'avatar',
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

    const newVedio = new Vedio(body)

    try {
      const Id = await newVedio.save()
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

    if (!body.id || !body.update)
      return ctx.body = {
        Error: '请求格式错误'
      }

    try {
      let doc = await Vedio.findById({ _id: body.id })

      Object.assign(doc, body.update)

      await Promise.all([
        doc.save(),
        Type.update({ _id: { $in: doc.type } }, { $addToSet: { vedios: body.id } })
      ])

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
            .findById(id)
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

  static async getChild(ctx) {
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
