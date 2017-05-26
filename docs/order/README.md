# api 文档

- 所有api均以/api/v1为前缀, 如`/v1/api/order`
- 所有包含有ObjectId的文档, 查询时可额外传一个`populate:Boolean`, 若为`true`则返回所有字段及其关联字段

-------------------------------------------------------------------

#### put    /order  增加分类
接受参数
- from `ObjectId` => 该订单的创建人
- vedio `ObjectId` => 购买的视频id
- payment `Boolean` => 是否付过款

若增加成功， 则返回状态码 `201`

#### delete      /orders  删除分类信息
接受参数
- ids `String` => 格式 ('id1+id2+id3+...') 想要删除的视频ids

若删除成功， 返回状态码`204`

#### post    /orders  修改分类信息
接受参数
- id `String` => 修改省份对应的id
- update `JSON` => 要修改的字段

若修改成功返回状态码 `201`

#### get   /orders 查询分类信息
接受get参数
- limit `Number` => 一页的视频数量
- page `Number` => 当前页数
- ids `String` => 可选 (格式'id1+id2+id3+...') 返回该id对应的省份信息
- keys `String` => 可选 (格式'key1+key2+key3+...') 返回该key对应的字段

```
return {
  Total: Number => 总数,
  ResultList: [
    {
      _id: id,
      name: String,
      ... 
    },
    ...
  ]
}
```

#### get  /order/:id 该id分类信息

接受get参数
- key `String`('key1+key2+key3+...')

```
return {
  Total: 1,
  ResultList: [
    {
      _id: id,
      name: String
    }
  ]
}
```

