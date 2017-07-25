'use strict';

var _parseInt = require('babel-runtime/core-js/number/parse-int');

var _parseInt2 = _interopRequireDefault(_parseInt);

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
      user: {},
      ownVdeios: [],
      pageIndex: 0,
      totaltimes: [],
      fixTop: '360px'
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
    payFor: function payFor() {
      (0, _sweetalert2.default)('', '请加QQ2080437116, :)', 'success');
    },
    editUser: function editUser() {
      console.log(this.user);

      _superagent2.default.post('/v1/api/user/users').send({
        id: this.user._id,
        update: {
          name: this.user.name,
          job: this.user.job,
          gender: this.user.gender,
          summary: this.user.summary
        }
      }).end(function (err, res) {
        if (err) console.error(err);else {
          (0, _sweetalert2.default)('', '修改成功', 'success');
        }
      });
    },
    toTop: function toTop() {
      var _timer = setInterval(function () {
        var addr = document.body.scrollTop = document.body.scrollTop - 100;

        if (addr <= 0) {
          clearInterval(_timer);
        }
      }, 10);
    },
    goToOrder: function goToOrder() {
      window.location.href = '/order';
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
    aboutUs: function aboutUs() {
      (0, _sweetalert2.default)('', 'QQ2080437116 ：）', 'success');
    },
    _valiInput: function _valiInput(data) {
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
          self.user = body.user;
          _this.isSingnedin = true;
        }
      });
    },
    _initCourse: function _initCourse() {
      var _this2 = this;

      _superagent2.default.get('/v1/api/user/user/' + this.user._id).query({
        keys: 'ownedvedios',
        populate: true
      }).end(function (err, res) {
        if (err) console.error(err);else {
          _this2.ownVdeios = res.body.ResultList[0].ownedvedios;

          _this2.ownVdeios.forEach(function (video, i) {
            var ids = video.children.join('+');
            if (ids) {
              _superagent2.default.get('/v1/api/vedio/children').query({
                ids: ids
              }).end(function (err, res) {
                if (err) console.error(err);else {
                  var totalTime = 0;

                  res.body.ResultList.forEach(function (item) {
                    totalTime += (0, _parseInt2.default)(item.time);
                  });
                  console.log(totalTime);

                  var sss = totalTime / 1000;

                  var hour = (0, _parseInt2.default)(sss / 60 / 60);
                  var minute = (0, _parseInt2.default)((sss - hour * 60 * 60) / 60);
                  var second = (0, _parseInt2.default)(sss - hour * 60 * 60 - minute * 60);

                  _this2.totaltimes[i] = hour + '\u65F6' + minute + '\u5206' + second + '\u79D2';
                }
              });
            } else {
              _this2.totaltimes[i] = '0时0分0秒';
            }
          });
        }
      });
    },
    changeAvatar: function changeAvatar(e) {
      var self = this;

      var fileReader = new FileReader();
      fileReader.onload = function () {
        _superagent2.default.post('/v1/api/user/users').send({
          id: self.user._id,
          update: {
            username: self.user.username,
            avatar: this.result
          }
        }).end(function (err, res) {
          if (err) console.error(err);else {
            if (res.status === 201) {
              (0, _sweetalert2.default)('', '修改头像成功', 'success');
              self.user.avatar = res.body.Id.avatar;
            }
          }
        });
      };
      fileReader.readAsDataURL(e.target.files[0]);
    },
    _initOrder: function _initOrder() {}
  },
  filters: {
    fitGender: function fitGender(gender) {
      switch (gender) {
        case 0:
          return '男';
        case 1:
          return '女';
        case 2:
          return '保密';
      }
    },
    fitJob: function fitJob(job) {
      if (!job) return '无业游民~';

      return job;
    }
  },
  watch: {
    pageIndex: function pageIndex(nV, oV) {
      switch (nV) {
        case 1:
          this._initCourse();
          break;
        case 2:
          this._initOrder();
          break;
      }
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    var self = this;
    sr.reveal('.detail');

    window.addEventListener('scroll', this._throttle(function (e) {
      self.scrollTop = document.body.scrollTop;

      if (self.scrollTop >= 240) {
        self.fixTop = '120px';
      } else self.fixTop = 360 - self.scrollTop + 'px';
    }, 10));

    _superagent2.default.get('/v1/api/user/personal').end(function (err, res) {
      if (err) console.error(err);else {
        if (res.body.isLogin) {
          _this3.user = res.body.user;
          _this3.isSingnedin = true;

          console.log(_this3.user);
          if (/course/.test('course')) {
            _this3._initCourse();
            _this3.pageIndex = 1;
          }
        }
      }
    });
  }
}).$mount('#root');
//# sourceMappingURL=maps/personal.js.map
