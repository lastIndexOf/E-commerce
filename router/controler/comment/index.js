const
  { send }        =  require('../../utils'),
  VedioChild      =  require('../../../Models/vediochildren.js'),
  Vedio           =  require('../../../Models/vedio.js'),
  Comment         =  require('../../../Models/comment.js'),
  BaseContructor  =  require('./base.js')

module.exports = class Comment extends BaseContructor {
  // Type
  static async putComment(ctx) {
    const body = ctx.request.body

    const requiredKeys = [
      'from',
      'content'
    ]

    for (let key of requiredKeys) {
      if (!(key in body))
        return ctx.body = {
          Error: '请求格式错误'
        }
    }

    const newComment= new Comment(body)

    try {
      const Id = await newComment.save()

      if (body.vedio) {
        await Vedio.update({ _id: body.vedio }, { $addToSet: { comment: Id._id } })
      } else if (body.vediochildren){
        await VedioChild.update({ _id: body.vediochildren }, { $addToSet: { comment: Id._id } })
      }

      ctx.status = 201
      return ctx.body = { Id }
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async delComment(ctx) {
    const body = ctx.request.body

    if (!body.ids)
      return ctx.body = {
        Error: '请求格式错误'
      }

    const ids = body.ids.split('+')

    try {
      await Promise.all([
        Comment.remove({ _id: { $in: ids } }),
        Vedio.update({ comment: { $in: ids } }, { $pull: { comment: { $in: ids } } }),
        VedioChild.update({ comment: { $in: ids } }, { $pull: { comment: { $in: ids } } })
      ])

      return ctx.status = 204
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async postComment(ctx) {
    const body = ctx.request.body

    if (!body.id || !body.update)
      return ctx.body = {
        Error: '请求格式错误'
      }

    try {
      let doc = await Type.findById({ _id: body.id })

      Object.assign(doc, body.update)

      await doc.save()

      return ctx.status = 201
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async getComment(ctx) {
    const id = ctx.params.id
    const query = ctx.request.query

    if (!query.keys) {
      if (query.populate) {
        try {
          const data = await Comment
            .findById(id)
            .populate('vedio')
            .populate('vediochildren')

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
          const data = await Comment.findById(id)

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
          const data = await Comment
            .find({ _id: id })
            .populate('vedio')
            .populate('vediochildren')
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
          const data = await Comment
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

  static async getComments(ctx) {
    const query = ctx.request.query

    if (query.ids) {
      const ids = query.ids.split('+')

      if (!query.keys) {
        if (query.populate) {
          try {
            let datas = await Comment
              .find({ _id: { $in: ids } })
              .populate('vedio')
              .populate('vediochildren')

            const count = await Comment.count()

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
            let datas = await Comment
              .find({ _id: { $in: ids } })

            const count = await Comment.count()

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
            let datas = await Comment
              .find({ _id: { $in: ids } })
              .populate('vedio')
              .populate('vediochildren')
              .select(keys)

            const count = await Comment.count()

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
            let datas = await Comment
              .find({ _id: { $in: ids } })
              .select(keys)

            const count = await Comment.count()

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
            let datas = await Comment
              .find({})
              .populate('vedio')
              .populate('vediochildren')
              .limit(query.limit - 0)
              .skip(query.page - 1)

            const count = await Comment.count()

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
            let datas = await Comment
              .find({})
              .limit(query.limit - 0)
              .skip(query.page - 1)

            const count = await Comment.count()

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
            let data = Comment
              .find({})
              .select(keys)
              .populate('vedio')
              .populate('vediochildren')
              .limit(query.limit - 0)
              .skip(query.page - 1)

            let count = Comment.count()

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
            let data = Comment
              .find({})
              .select(keys)
              .limit(query.limit - 0)
              .skip(query.page - 1)

            let count = Comment.count()

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


}
