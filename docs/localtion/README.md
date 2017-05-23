- 所有api均以/api/v1为前缀, 如`/v1/api/vedios`

-------------------------------------------------------------------
#### put    /province  增加一个省份信息
接受参数
- name `String` => 增加的省份名

若增加成功， 则返回状态码 `201`

#### delete      /provinces  删除省份信息
接受参数
- ids `String` => 格式 ('id1+id2+id3+...') 想要删除的省份ids

若删除成功， 返回状态码`204`

#### post    /provinces 修改省份信息
接受参数
- id `String` => 修改省份对应的id
- update `JSON` => 要修改的字段

若修改成功返回状态码 `201`

#### get   /provinces 查询所有省份信息
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

#### get  /province/:id 该id所属省份信息

接受get参数
- key `String`('key1+key2+key3+...')

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

#### put    /city  增加一个城市信息
接受参数
- name `String` => 增加的城市名
- province `String` => 所属省份id

若增加成功， 则返回状态码 `201`

#### delete      /cities  删除城市信息
接受参数
- ids `String` => 格式 ('id1+id2+id3+...') 想要删除的城市ids

若删除成功， 返回状态码`204`

#### post    /cities 修改城市信息
接受参数
- id `String` => 修改省份对应的id
- update `JSON` => 要修改的字段

若修改成功返回状态码 `201`

#### get   /cities 所有省份信息
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
      province: 所属省份id,
      name: 城市名,
    },
    ...
  ]
}
```

#### get  /city/:id 该id所属省份信息

接受get参数
- key `String`('key1+key2+key3+...')

```
return {
  Total: 1,
  ResultList: [
    {
      ObjectId: id,
      province: 所属省份id,
      name: 城市名
    }
  ]
}
```

#### put    /area  增加一个地区信息
接受参数
- name `String` => 增加的地区名
- city `String` => 所属城市id

若增加成功， 则返回状态码 `201`

#### delete      /areas  删除城市信息
接受参数
- ids `String` => 格式 ('id1+id2+id3+...') 想要删除的城市ids

若删除成功， 返回状态码`204`

#### post    /areas 修改城市信息
接受参数
- id `String` => 修改省份对应的id
- update `JSON` => 要修改的字段

若修改成功返回状态码 `201`


#### get   /areas 所有省份信息
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
      city: 所属城市id,
      name: 地区名
    },
    ...
  ]
}
```

#### get  /area/:id 该id所属省份信息

接受get参数
- key `String`('key1+key2+key3+...')

```
return {
  Total: 1,
  ResultList: [
    {
      ObjectId: id,
      city: 所属城市id,
      name: 地区名
    }
  ]
}
```
