# api 文档

- 所有api均以/api/v1为前缀, 如`/v1/api/vedio`
- 所有包含有ObjectId的文档, 查询时可额外传一个`populate:Boolean`, 若为`true`则返回所有字段及其关联字段

-------------------------------------------------------------------

#### put    /vedio  增加一个视频信息
接受参数
- title `String` => 该套视频标题
- avatar `String` => 该套视频的图标
- author `ObjectId` => 该套视频作者
- type `[ObjectId]` => 该视频所属类别
- summary `String` => 该视频的简介
- diffculty `Number` => 该视频的难度(2高级|1中级|0初级)

若增加成功， 则返回状态码 `201`

#### delete      /vedios  删除大视频信息
接受参数
- ids `String` => 格式 ('id1+id2+id3+...') 想要删除的视频ids

若删除成功， 返回状态码`204`

#### post    /vedios 修改大视频信息
接受参数
- id `String` => 修改省份对应的id
- update `JSON` => 要修改的字段

若修改成功返回状态码 `201`

#### get   /vedios 查询大视频信息
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
      ObjectId: id,
      name: 省名
    },
    ...
  ]
}
```

#### get  /vedio/:id 该id大视频信息

接受get参数
- keys `String`('key1+key2+key3+...')

```
return {
  Total: 1,
  ResultList: [
    {
      ObjectId: id,
      name: 省名
    }
  ]
}
```

#### put    /child  增加一个视频信息
接受参数
- parent `ObjectId` => 该子视频所属的那套视频Id
- title `String` => 该子视频的标题
- src `String` => 该子视频的播放路径ß

若增加成功， 则返回状态码 `201`

#### delete      /children  删除大视频信息
接受参数
- ids `String` => 格式 ('id1+id2+id3+...') 想要删除的视频ids

若删除成功， 返回状态码`204`

#### post    /children 修改大视频信息
接受参数
- id `String` => 修改省份对应的id
- update `JSON` => 要修改的字段

若修改成功返回状态码 `201`

#### get   /children 查询大视频信息
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
      ObjectId: id,
      name: 省名
    },
    ...
  ]
}
```

#### get  /child/:id 该id大视频信息

接受get参数
- keys `String`('key1+key2+key3+...')

```
return {
  Total: 1,
  ResultList: [
    {
      ObjectId: id,
      name: 省名
    }
  ]
}
```
