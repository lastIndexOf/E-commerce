- 所有api均以/api/v1为前缀, 如`/v1/api/vedios`

-------------------------------------------------------------------

#### get   /provinces 所有省份信息
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

#### get  /province/:id 该id所属省份信息

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
