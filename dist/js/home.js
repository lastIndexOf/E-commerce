'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _vue = require('vue/dist/vue.js');

var _vue2 = _interopRequireDefault(_vue);

var _scrollreveal = require('scrollreveal');

var _scrollreveal2 = _interopRequireDefault(_scrollreveal);

var _sweetalert = require('sweetalert2');

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.sr = (0, _scrollreveal2.default)({ reset: true });

new _vue2.default({
  data: function data() {
    return {
      scrollTop: 0,
      isSingnedin: false,
      _user: {},
      data: {
        types: ['前端开发', '后端开发', '移动开发', '数据库', '云计算&大数据', '运维&计算', 'UI设计']
      },
      tabs: [{}, {}],
      navBottom: ['/static/images/path_1.png', '/static/images/path_1.png', '/static/images/path_1.png', '/static/images/path_1.png', '/static/images/path_1.png'],
      details: [{
        title: '前端开发工程师',
        children: [{
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }]
      }, {
        title: '前端开发工程师',
        children: [{
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }]
      }, {
        title: '前端开发工程师',
        children: [{
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }]
      }, {
        title: '前端开发工程师',
        children: [{
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }]
      }, {
        title: '前端开发工程师',
        children: [{
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }, {
          title: '从H5网页开发到移动响应式开发',
          src: '#',
          instruction: 'test instruction',
          diff: '1'
        }]
      }]
    };
  },

  computed: {
    isShow: function isShow() {
      var wHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

      if (this.scrollTop - wHeight >= 0) return true;

      return false;
    }
  },
  methods: {
    test: function test() {
      console.log(1);
    },
    payFor: function payFor() {
      (0, _sweetalert2.default)('', '请加QQ2080437116, :)', 'success');
    },
    toTop: function toTop() {
      var _timer = setInterval(function () {
        var addr = document.body.scrollTop = document.body.scrollTop - 100;

        if (addr <= 0) {
          clearInterval(_timer);
        }
      }, 10);
    },
    aboutUs: function aboutUs() {
      (0, _sweetalert2.default)('', 'QQ2080437116 ：）', 'success');
    },
    _throttle: function _throttle(func) {
      var _timer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

      var _start = void 0;

      return function () {
        var that = this;
        var args = arguments;

        if (!_start) {
          func.apply(this, args);

          _start = Date.now();
        } else {
          if (Date.now() - _start > _timer) {
            func.apply(this, args);

            _start = Date.now();
          }
        }
      };
    },
    _valiInput: function _valiInput(data) {
      console.log(data.username.value);
      console.log(data.password.value);
      console.log(data.email.value);
      console.log(data.gender.value);
      if (!/^([a-zA-Z])[\w\W]{7,}/.test(data.username.value)) {
        (0, _sweetalert2.default)('', '请输入以字母开头，至少为7位的用户名', 'warning');
        return false;
      }

      if (data.repeat.value !== data.password.value) {
        (0, _sweetalert2.default)('', '请确保两次输入密码相同', 'warning');
        return false;
      }

      if (!/[\w\W]{7,}/.test(data.password.value)) {
        (0, _sweetalert2.default)('', '请输入至少为7为的密码', 'warning');
        return false;
      }

      if (!/^[\w\W]+@[\w\W]+.com$/.test(data.email.value)) {
        (0, _sweetalert2.default)('', '请输入正确的邮箱地址', 'warning');
        return false;
      }

      if (!data.gender.value) {
        (0, _sweetalert2.default)('', '请选择性别', 'warning');
        return false;
      }

      return true;
    },
    signup: function signup() {
      var self = this;

      (0, _sweetalert2.default)({
        title: '新账号注册',
        html: '<form id="signup-form">' + '<input type="text" name="username" class="swal2-input" placeholder="用户名"/>' + '<input type="password" name="password" class="swal2-input" placeholder="密码"/>' + '<input type="password" name="repeat" class="swal2-input" placeholder="重复密码"/>' + '<input type="email" name="email" class="swal2-input" placeholder="邮箱"/>' + '<div class="swal2-radio">' + '<label>' + '<input type="radio" id="gender" name="gender" value="0"/><span>男</span>' + '</label>' + '<label>' + '<input type="radio" name="gender" value="1"/><span>女</span>' + '</label>' + '<label>' + '<input type="radio" name="gender" value="2"/><span>保密</span>' + '</label>' + '</div>' + '</form>',
        confirmButtonText: '注册',
        showLoaderOnConfirm: true,
        preConfirm: function preConfirm() {
          return new _promise2.default(function (resolve, reject) {
            var form = document.querySelector('#signup-form').elements;

            if (self._valiInput(form)) _superagent2.default.put('/v1/api/user/user').send({
              username: form.username.value,
              password: form.password.value,
              email: form.email.value,
              gender: form.gender.value
            }).end(function (err, res) {
              if (err) console.error(err);else {
                if (res.status === 201) {
                  resolve();
                } else {
                  reject('signup wrong');
                }
              }
            });else reject();
          });
        }
      }).then(function () {
        (0, _sweetalert2.default)('', '注册成功！:)', 'success');
      }).catch(function (msg) {
        if (msg === 'signup wrong') (0, _sweetalert2.default)('', '注册失败:(, 请稍后再试', 'wrong');
      });

      document.querySelector('#gender').name = 'gender';
    },
    signin: function signin() {
      var _this = this;

      var self = this;

      (0, _sweetalert2.default)({
        title: '用户登录',
        html: '<form id="signup-form">' + '<input type="text" name="username" class="swal2-input" placeholder="用户名/邮箱地址"/>' + '<input type="password" name="password" class="swal2-input" placeholder="密码"/>' + '</form>',
        confirmButtonText: '登录',
        showLoaderOnConfirm: true,
        preConfirm: function preConfirm() {
          return new _promise2.default(function (resolve, reject) {
            var form = document.querySelector('#signup-form').elements;

            _superagent2.default.post('/v1/api/user/login').send({
              username: form.username.value,
              password: form.password.value
            }).end(function (err, res) {
              if (err) console.error(err);else {
                resolve(res.body);
              }
            });
          });
        }
      }).then(function (body) {
        if (!body.isLogin) (0, _sweetalert2.default)('', body.Error, 'error');else {
          self._user = body.user;
          _this.isSingnedin = true;
        }
      });
    }
  },
  filters: {
    diffFilt: function diffFilt(val) {
      switch (val) {
        case '2':
          return '高级';
        case '1':
          return '中级';
        case '0':
          return '初级';
      }
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    var self = this;
    sr.reveal('.detail');

    window.addEventListener('scroll', this._throttle(function (e) {
      self.scrollTop = document.body.scrollTop;
    }, 50));

    _superagent2.default.get('/v1/api/user/personal').end(function (err, res) {
      if (err) console.error(err);else {
        if (res.body.isLogin) {
          _this2._user = res.body.user;
          _this2.isSingnedin = true;
        }
      }
    });
  }
}).$mount('#root');
//# sourceMappingURL=maps/home.js.map
