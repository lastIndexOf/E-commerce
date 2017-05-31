'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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
      currentPoint: 0,
      _user: {},
      selectall: false,
      shopcar: []
    };
  },

  computed: {
    isShow: function isShow() {
      var wHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

      if (this.scrollTop - wHeight >= 0) return true;

      return false;
    },
    sumMoney: function sumMoney() {
      var sum = 0;
      for (var i = 0, len = this.shopcar.length; i < len; i++) {
        sum += this.shopcar[i].money;
      }

      return sum;
    },
    allSum: function allSum() {
      return this.shopcar.length;
    }
  },
  methods: {
    changePoint: function changePoint(index) {
      this.currentPoint = index;
    },
    cancel: function cancel(id) {
      var _this = this;

      var index = this.shopcar.findIndex(function (item) {
        return item._id === id;
      });

      var arr = [];
      var newShopCar = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this.shopcar.entries()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
              i = _step$value[0],
              value = _step$value[1];

          if (index === i) continue;

          arr.push(value._id);
          newShopCar.push(value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      console.log(arr);
      _superagent2.default.post('/v1/api/user/users').send({
        id: this._user._id,
        update: {
          shopcar: arr
        }
      }).end(function (err, res) {
        if (err) console.error(err);else {
          if (res.status === 201) {
            (0, _sweetalert2.default)('', '删除成功', 'success');
            _this.shopcar = newShopCar;
          }
        }
      });
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
      var _this2 = this;

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
          _this2.isSingnedin = true;
        }
      });
    },
    buyVedio: function buyVedio() {
      var _this3 = this;

      var ids = [];
      var shopcar = [];
      var newShopCar = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(this.shopcar), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;

          if (item.checked) {
            ids.push(item._id);
          } else {
            newShopCar.push(item);
            shopcar.push(item._id);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = (0, _getIterator3.default)(ids), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var id = _step3.value;

          this._user.ownedvedios.push(id);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      _superagent2.default.post('/v1/api/user/users').send({
        id: this._user._id,
        update: {
          ownedvedios: this._user.ownedvedios,
          shopcar: shopcar
        }
      }).end(function (err, res) {
        if (err) console.error(err);else {
          if (res.status === 201) {
            (0, _sweetalert2.default)('', '购买成功!请尽情享受吧', 'success');
            _this3.shopcar = newShopCar;
          }
        }
      });
    }
  },
  filters: {
    getsum: function getsum(shopcar) {
      var sum = 0;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = (0, _getIterator3.default)(shopcar), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var item = _step4.value;

          if (item.checked) sum++;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return sum;
    }
  },
  watch: {
    selectall: function selectall(nV) {
      if (nV) {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = (0, _getIterator3.default)(this.shopcar), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var item = _step5.value;

            item.checked = true;
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      } else {
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = (0, _getIterator3.default)(this.shopcar), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var _item = _step6.value;

            _item.checked = false;
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }
      }
    }
  },
  mounted: function mounted() {
    var _this4 = this;

    var self = this;
    sr.reveal('.detail');

    window.addEventListener('scroll', this._throttle(function (e) {
      self.scrollTop = document.body.scrollTop;
    }, 50));

    _superagent2.default.get('/v1/api/user/personal').end(function (err, res) {
      if (err) console.error(err);else {
        if (res.body.isLogin) {
          _this4._user = res.body.user;
          _this4.isSingnedin = true;

          _superagent2.default.get('/v1/api/user/user/' + _this4._user._id).query({
            populate: true
          }).end(function (err, res) {
            if (err) console.error(err);else {
              _this4._user = res.body.ResultList[0];
              _this4.shopcar = _this4._user.shopcar;
            }
          });
        }
      }
    });
  }
}).$mount('#root');
//# sourceMappingURL=maps/order.js.map
