# 数据库设计文档

- 每个`Schema`中都有一个`meta`字段
```
meta: {
  createdAt:Date,
  updatedAt:Date
}
```

Schema: `vedio`

```
_id:ObjectId => id
title:String => 该套视频标题
avatar:String => 该套视频的图标
author:ObjectId => 该套视频作者
money:Number => 该套视频的售价
type:[ObjectId] => 该视频所属类别
followers:[ObjectId] => 关注改视频的用户
summary:String => 该视频简介
totaltime:String => 该视频总时长
diffculty:Number => 该视频难度(2高级|1中级|0初级)
children:[ObjectId] => 每一章节对应的子视频
comment:[ObjectId] => 用户对该视频的评价
promotion:String => 作者对该视频的介绍
isthrough:Boolean => 是否通过审核
```

Schema: `vediochildren`

```
_id:ObjectId => id
parent:ObjectId => 所属的父视频
title:String => 该子章节的标题
src:String => 该子章节对应的路径
comment:[ObjectId] => 该子章节对应的评论
```

Schema: `comment`

```
_id:ObjectId => id
vedio:ObjectId => 该评论所属视频
vediochildren:ObjectId => 该评论所属子视频
from:ObjectId => 该评论对应的评论人
content:String => 该评论内容
```

Schema: `type`

```
_id:ObjectId => id
name:String => 该分类名称
vedios:[ObjectId] => 属于该分类的视频
```

Schema: `order` (订单)

```
_id:ObjectId => id
from:ObjectId => 该订单的创建人
vedio:ObjectId => 该订单上对应购买的视频
payment:Boolean => 是否付过款
```

Schema: `user`

```
_id:ObjectId => id
password:String => bcrypt加密后的密码串
username:String => 昵称
avatar:String => 头像url
name:String => 姓名
job:String => 工作岗位
area:ObjectId => 所在城市
gender:Number => 性别(0|男|1女|2保密)
email:String => 电子邮箱
phone:Number => 移动电话
summary:String => 个人简介
lastmodified:String => 最后登陆时间
shopchar:[ObjectId] => 添加到购物车中的视频
ownedvedios:[ObjectId] => 已购买的视频
role:number(0) => 权限(默认0， 超级管理员>=50)
```

Schema: `master`

```
_id:ObjectId => id
password:String => bcrypt加密后的密码串
username:String => 昵称
avatar:String => 头像url
name:String => 姓名
job:String => 工作岗位
gender:Number => 性别(0|男|1女|2保密)
summary:String => 个人简介
own:[ObjectId] => 发布的视频
role:number(0) => 权限(默认0， 超级管理员>=50)
```

Schema: `admin`

```
_id:ObjectId => id
name:String => 姓名
password:String => bcrypt加密后的密码串
username:String => 昵称
gender:Number => 性别(0|男|1女|2保密)
role:number(50) => 权限(默认0， 超级管理员>=50)
```

Schema: `province`

```
_id:ObjectId => id
name:String => 省名
```

Schema: `city`

```
_id:ObjectId => id
name:String => 市名
province:ObjectId => 所属省
```

Schema: `area`

```
_id:ObjectId => id
name:String => 区名
city:ObjectId => 所属市
```
