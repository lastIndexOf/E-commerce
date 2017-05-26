const
  { send }        =  require('../../utils'),
  Province        =  require('../../../Models/province.js'),
  City        =  require('../../../Models/city.js'),
  Area        =  require('../../../Models/area.js'),
  BaseContructor  =  require('./base.js')

module.exports = class Location extends BaseContructor {
  // Province
  static async putProvince(ctx) {
    const body = ctx.request.body

    if (!body.name)
      return ctx.body = {
        Error: '请求格式错误'
      }

    const newProvince = new Province(body)

    try {
      const Id = await newProvince.save()
      ctx.status = 201
      return ctx.body = { Id }
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async delProvince(ctx) {
    const body = ctx.request.body

    if (!body.ids)
      return ctx.body = {
        Error: '请求格式错误'
      }

    const ids = body.ids.split('+')

    try {
      await Province.remove({ _id: { $in: ids } })

      return ctx.status = 204
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async postProvince(ctx) {
    const body = ctx.request.body

    if (!body.id || !body.update)
      return ctx.body = {
        Error: '请求格式错误'
      }

    try {
      let doc = await Province.findById({ _id: body.id })

      Object.assign(doc, body.update)

      await doc.save()

      return ctx.status = 201
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async getProvince(ctx) {
    const id = ctx.params.id
    const query = ctx.request.query

    if (!query.keys) {
      try {
        const data = await Province.findById(id)

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
      const keys = query.keys.split('+').join(' ')

      try {
        const data = await Province
          .find({ _id: id })
          .select(keys)

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

  }

  static async getProvinces(ctx) {
    const query = ctx.request.query

    if (query.ids) {
      const ids = query.ids.split('+')

      if (!query.keys) {
        try {
          let datas = await Province.find({ _id: { $in: ids } })

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
        const keys = query.keys.split('+').join(' ')

        try {
          let datas = await Province
            .find({ _id: { $in: ids } })
            .populate(keys)

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
    } else if (!query.limit || !query.page) {
      return ctx.body = {
        Error: '请求格式错误'
      }
    } else {
      if (!query.keys) {
        try {
          let datas = await Province
            .find({})
            .limit(query.limit)
            .skip(query.page)

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
        const keys = query.keys.split('+').join(' ')

        try {
          let data = Province
            .find({})
            .select(keys)
            .limit(query.limit - 0)
            .skip(query.page - 1)

          let count = Province.count()

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

  // City
  static async putCity(ctx) {
    const body = ctx.request.body

    if (!body.name)
      return ctx.body = {
        Error: '请求格式错误'
      }

    const newCity = new City(body)

    try {
      const Id = await newCity.save()
      ctx.status = 201
      return ctx.body = { Id }
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async delCity(ctx) {
    const body = ctx.request.body

    if (!body.ids)
      return ctx.body = {
        Error: '请求格式错误'
      }

    const ids = body.ids.split('+')
    try {
      await City.remove({ _id: { $in: ids } })

      return ctx.status = 204
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async postCity(ctx) {
    const body = ctx.request.body

    if (!body.id || !body.update)
      return ctx.body = {
        Error: '请求格式错误'
      }

    try {
      let doc = await City.findById({ _id: body.id })

      Object.assign(doc, body.update)

      await doc.save()

      return ctx.status = 201
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async getCity(ctx) {
    const id = ctx.params.id
    const query = ctx.request.query

    if (!query.keys) {
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
    } else {
      const keys = query.keys.split('+').join(' ')

      try {
        const data = await City
          .find({ _id: id })
          .select(keys)

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

  }

  static async getCities(ctx) {
    const query = ctx.request.query

    if (query.ids) {
      const ids = query.ids.split('+')

      if (!query.keys) {
        try {
          let datas = await Province.find({ _id: { $in: ids } })

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
        const keys = query.keys.split('+').join(' ')

        try {
          let datas = await Province
            .find({ _id: { $in: ids } })
            .populate(keys)

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
    } else if (!query.limit || !query.page) {
      return ctx.body = {
        Error: '请求格式错误'
      }
    } else {
      if (!query.keys) {
        try {
          let datas
          if (query.populate) {
            datas = await City
              .find({})
              .limit(query.limit - 0)
              .skip(query.page)
              .populate('province', 'name _id')
          } else {
            datas = await City
              .find({})
              .limit(query.limit - 0)
              .skip(query.page)
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
        const keys = query.keys.split('+').join(' ')

        try {
          let data
          if (query.populate) {
            data = City
              .find({})
              .populate('province', 'name _id')
              .select(keys)
              .limit(query.limit - 0)
              .skip(query.page - 1)
          } else {
            data = City
              .find({})
              .select(keys)
              .limit(query.limit - 0)
              .skip(query.page - 1)
          }

          let count = City.count()

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

  // Area
  static async putArea(ctx) {
    const body = ctx.request.body

    if (!body.name)
      return ctx.body = {
        Error: '请求格式错误'
      }

    const newArea = new Area(body)

    try {
      const Id = await newArea.save()
      ctx.status = 201
      return ctx.body = { Id }
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async delArea(ctx) {
    const body = ctx.request.body

    if (!body.ids)
      return ctx.body = {
        Error: '请求格式错误'
      }

    const ids = body.ids.split('+')

    try {
      await Area.remove({ _id: { $in: ids } })

      return ctx.status = 204
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async postArea(ctx) {
    const body = ctx.request.body

    if (!body.id || !body.update)
      return ctx.body = {
        Error: '请求格式错误'
      }

    try {
      let doc = await Area.findById({ _id: body.id })

      Object.assign(doc, body.update)

      await doc.save()

      return ctx.status = 201
    } catch(e) {
      return ctx.body = {
        Error: e.message
      }
    }
  }

  static async getArea(ctx) {
    const id = ctx.params.id
    const query = ctx.request.query

    if (!query.keys) {
      try {
        const data = await Area.findById(id)

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
      const keys = query.keys.split('+').join(' ')

      try {
        const data = await Area
          .find({ _id: id })
          .select(keys)

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

  }

  static async getAreas(ctx) {
    const query = ctx.request.query

    if (query.ids) {
      const ids = query.ids.split('+')

      if (!query.keys) {
        try {
          let datas = await Province.find({ _id: { $in: ids } })

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
        const keys = query.keys.split('+').join(' ')

        try {
          let datas = await Province
            .find({ _id: { $in: ids } })
            .populate(keys)

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
    } else if (!query.limit || !query.page) {
      return ctx.body = {
        Error: '请求格式错误'
      }
    } else {
      if (!query.keys) {
        try {
          let datas
          if (query.populate) {
            datas = await Area
              .find({})
              .limit(query.limit - 0)
              .skip(query.page)
              .populate('city', '_id name')
          } else {
            datas = await Area
              .find({})
              .limit(query.limit - 0)
              .skip(query.page)
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
        const keys = query.keys.split('+').join(' ')

        try {
          let data
          if (query.populate) {
            data = Area
              .find({})
              .select(keys)
              .limit(query.limit - 0)
              .skip(query.page - 1)
              .populate('city', '_id name')
          } else {
            data = Area
              .find({})
              .select(keys)
              .limit(query.limit - 0)
              .skip(query.page - 1)
          }

          let count = Area.count()

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
