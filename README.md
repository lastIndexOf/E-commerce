# gulp-cli
这是一个简单的利用gulp搭建的es6+stylus开发环境

使用方法

- cd somewhere/

-  git clone https://github.com/lastIndexOf/gulp-cli.git

- cd gulp-cli

- npm i

然后自己根据需要配置利用express或者koa配置APIs(默认koa), 最后

- gulp

主要功能

```
当app/es6下的js文件发生变化时，将其编译为es5版本并通过browserify打包并移动到dist/js/bundles目录下

当app/styl下的.styl文件发生变化时，将其编译为css并移动到dist/css下

以上过程结束后均会自动重启浏览器

当其他js文件发生变化时，自动重新执行node server即重启服务器
```

#### 配置文件可在config.js下修改
# E-commerce-
# E-commerce-
