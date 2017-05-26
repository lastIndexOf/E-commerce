# api 文档

- 所有api均以/api/v1为前缀, 如`/v1/api/user`
- 所有包含有ObjectId的文档, 查询时可额外传一个`populate:Boolean`, 若为`true`则返回所有字段及其关联字段

-------------------------------------------------------------------

#### put    /user  增加一个普通用户
接受参数
- username `String` => 该用户的昵称
- email `String` => 该用户的email
- password `String` => 该用户的密码
- gender `Number` => 该用户的性别(0男|1女|2保密)

若增加成功， 则返回状态码 `201`

#### delete      /users  删除用户信息
接受参数
- ids `String` => 格式 ('id1+id2+id3+...') 想要删除的视频ids

若删除成功， 返回状态码`204`

#### post    /users 修改用户信息
接受参数
- id `String` => 修改省份对应的id
- update `JSON` => 要修改的字段

若修改成功返回状态码 `201`

#### get   /users 查询多位用户信息
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
      username: String,
      ... 
    },
    ...
  ]
}
```

#### get  /user/:id 该id用户信息

接受get参数
- key `String`('key1+key2+key3+...')

```
return {
  Total: 1,
  ResultList: [
    {
      _id: id,
      username: String
    }
  ]
}
```

#### put    /master  增加一个高级用户(可以发布视频)
接受参数
- username `String` => 该高级用户的用户名
- password `String` => 该高级用户的密码
- gender `Number` => 该用户的性别(0男|1女|2保密)

若增加成功， 则返回状态码 `201`

#### delete      /masters  删除高级用户信息
接受参数
- ids `String` => 格式 ('id1+id2+id3+...') 想要删除的视频ids

若删除成功， 返回状态码`204`

#### post    /masters 修改高级用户信息
接受参数
- id `String` => 修改用户对应的id
- update `JSON` => 要修改的字段

若修改成功返回状态码 `201`

#### get   /masters 查询高级用户信息
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
      username: 用户名
    },
    ...
  ]
}
```

#### get  /master/:id 该id高级用户信息

接受get参数
- key `String`('key1+key2+key3+...')

```
return {
  Total: 1,
  ResultList: [
    {
      _id: id,
      username: 用户名
    }
  ]
}
```
