# commerce website


- 数据库Schema设计

[数据库设计](https://github.com/lastIndexOf/E-commerce/tree/master/docs/sql)


- api

[视频](https://github.com/lastIndexOf/E-commerce/tree/master/docs/vedio)

[用户](https://github.com/lastIndexOf/E-commerce/tree/master/docs/user)

[商家](https://github.com/lastIndexOf/E-commerce/tree/master/docs/master)

[管理员](https://github.com/lastIndexOf/E-commerce/tree/master/docs/admin)

[地区](https://github.com/lastIndexOf/E-commerce/tree/master/docs/localtion)

[类型](https://github.com/lastIndexOf/E-commerce/tree/master/docs/type)

[订单](https://github.com/lastIndexOf/E-commerce/tree/master/docs/order)



### 说明

- npm install / yarn install

- 修改根目录下test.js中的管理员信息为你自己的信息

- node test.js `添加管理员`

- node server `开启服务器`

- 打开网站, 先进入后台 `localhost:4555/admin` 

- 进入视频管理页面添加7个分类 `确保首页数据显示`




#### 一些注意点

- 发布视频在后台进行, 发布视频时选择的发布人必须是高级用户, 高级用户必须在后台管理页面用户部分进行注册

- 视频发布成功后, 还要上线, 即在后台管理页面视频详情页编辑对应的视频,选择上线
