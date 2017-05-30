const
  Index    =  require('./controler/index'),
  User     =  require('./controler/user'),
  Vedio    =  require('./controler/video'),
  Type     =  require('./controler/type'),
  Comment  =  require('./controler/comment'),
  Location =  require('./controler/location'),
  Func     =  require('./controler/func')

module.exports = router => {
  /**
   * 200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
   * 201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
   * 202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
   * 204 NO CONTENT - [DELETE]：用户删除数据成功。
   * 301 永久重定向。
   * 302 临时重定定向。
   * 304 文件未更新, 用户使用缓存。
   * 400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
   * 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
   * 403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
   * 404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
   * 406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
   * 410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
   * 422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
   * 500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。
   */

  /**
   *  访问URL
   */

  router.get('/', Index.homeAction)
  router.get('/test/:id', Index.testAction)


  // 后台管理页面
  router.get('/admin',Func.adminSigninManager, Index.adminSigninAction)
  router.get('/admin/user',Func.isAdmin, Index.adminUserAction)
  router.get('/admin/location',Func.isAdmin, Index.adminLocationAction)
  router.get('/admin/vedio',Func.isAdmin, Index.adminVedioAction)
  router.get('/admin/other',Func.isAdmin, Index.adminOtherAction)



  /**
   *  功能性接口(登陆登出注册等)
   */
  // 普通用户
  router.get('/v1/api/user/personal', Func.getPersonal)
  router.post('/v1/api/user/login', Func.login)
  router.get('/v1/api/user/logout/:id', Func.logout)

  // 管理员
  router.get('/v1/api/admin/personal', Func.getAdminPersonal)
  router.post('/v1/api/admin/login', Func.adminLogin)
  router.get('/v1/api/admin/logout/:id', Func.adminLogout)

  /**
   *  User 接口
   */
  router.put('/v1/api/user/user', User.putUser)
  router.del('/v1/api/user/users', User.delUser)
  router.post('/v1/api/user/users', User.postUser)
  router.get('/v1/api/user/user/:id', User.getUser)
  router.get('/v1/api/user/users', User.getUsers)

  /**
  *  master 接口
  */
  router.put('/v1/api/user/master', User.putMaster)
  router.del('/v1/api/user/masters', User.delMaster)
  router.post('/v1/api/user/masters', User.postMaster)
  router.get('/v1/api/user/master/:id', User.getMaster)
  router.get('/v1/api/user/masters', User.getMasters)

  /**
   *  Admin 接口
   */

   // !!!!暂不予开放
  router.put('/v1/api/user/admin', User.putAdmin)
  router.del('/v1/api/user/admins', User.delAdmin)
  router.post('/v1/api/user/admins', User.postAdmin)
  router.get('/v1/api/user/admin/:id', User.getAdmin)
  router.get('/v1/api/user/admins', User.getAdmins)

   /**
   *  comment 接口
   */
  router.put('/v1/api/comment/comment', Comment.putComment)
  router.del('/v1/api/comment/comments', Comment.delComment)
  router.post('/v1/api/comment/comments', Comment.postComment)
  router.get('/v1/api/comment/comment/:id', Comment.getComment)
  router.get('/v1/api/comment/comments', Comment.getComments)

   /**
   *  type 接口
   */
  router.put('/v1/api/type/type', Type.putType)
  router.del('/v1/api/type/types', Type.delType)
  router.post('/v1/api/type/types', Type.postType)
  router.get('/v1/api/type/type/:id', Type.getType)
  router.get('/v1/api/type/types', Type.getTypes)

  /**
   *  vedio 接口
   */
  router.put('/v1/api/vedio/vedio', Vedio.putVedio)
  router.del('/v1/api/vedio/vedios', Vedio.delVedio)
  router.post('/v1/api/vedio/vedios', Vedio.postVedio)
  router.get('/v1/api/vedio/vedio/:id', Vedio.getVedio)
  router.get('/v1/api/vedio/vedios', Vedio.getVedios)

  router.put('/v1/api/vedio/child', Vedio.putChild)
  router.del('/v1/api/vedio/children', Vedio.delChild)
  router.post('/v1/api/vedio/children', Vedio.postChild)
  router.get('/v1/api/vedio/child/:id', Vedio.getChild)
  router.get('/v1/api/vedio/children', Vedio.getChildren)

 /**
  *  location 接口
  */
  router.put('/v1/api/location/province', Location.putProvince)
  router.del('/v1/api/location/provinces', Location.delProvince)
  router.post('/v1/api/location/provinces', Location.postProvince)
  router.get('/v1/api/location/province/:id', Location.getProvince)
  router.get('/v1/api/location/provinces', Location.getProvinces)

  router.put('/v1/api/location/city', Location.putCity)
  router.del('/v1/api/location/cities', Location.delCity)
  router.post('/v1/api/location/cities', Location.postCity)
  router.get('/v1/api/location/city/:id', Location.getCity)
  router.get('/v1/api/location/cities', Location.getCities)

  router.put('/v1/api/location/area', Location.putArea)
  router.del('/v1/api/location/areas', Location.delArea)
  router.post('/v1/api/location/areas', Location.postArea)
  router.get('/v1/api/location/area/:id', Location.getArea)
  router.get('/v1/api/location/areas', Location.getAreas)

  //  错误404页面
  router.get('*', Index.notFoundAction)
}
