import Vue from 'vue/dist/vue.js'
import ScrollReveal from 'scrollreveal'
import swal from 'sweetalert2'
import request from 'superagent'

window.sr = ScrollReveal({ reset: true })

new Vue({
  data () {
    return {
      scrollTop: 0,
      isSingnedin: false,
      currentPoint: 0,
      type: {},
      types: []
    }
  },
  computed: {
    isShow() {
      const wHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight

      if (this.scrollTop - wHeight >= 0)
        return true

      return false
    }
  },
  methods: {
    changePoint(index) {
      this.currentPoint = index  
    },
    payFor() {
      swal('', '请加QQ2080437116, :)', 'success')
    },
    toTop() {
      let _timer = setInterval(function() {
        const addr = document.body.scrollTop = document.body.scrollTop - 100
        
        if (addr <= 0) {
          clearInterval(_timer)
        }
      }, 10)
    },
    _throttle(func, _timer = 100) {
      let _start

      return function() {
        const that = this
        const args = arguments

        if (!_start) {
          func.apply(this, args)

          _start = Date.now()
        } else {
          if (Date.now() - _start > _timer) {
            func.apply(this, args)

            _start = Date.now()
          }
        }
      }
    },
    aboutUs() {
      swal('', 'QQ2080437116 ：）', 'success')
    },
    _valiInput(data) {
      console.log(data.username.value)
      console.log(data.password.value)
      console.log(data.email.value)
      console.log(data.gender.value)
      if (!/^([a-zA-Z])[\w\W]{7,}/.test(data.username.value)) {
        swal('', '请输入以字母开头，至少为7位的用户名', 'warning')
        return false
      }

      if (data.repeat.value !== data.password.value) {
        swal('', '请确保两次输入密码相同', 'warning')
        return false
      }

      if (!/[\w\W]{7,}/.test(data.password.value)) {
        swal('', '请输入至少为7为的密码', 'warning')
        return false
      }

      if (!/^[\w\W]+@[\w\W]+.com$/.test(data.email.value)) {
        swal('', '请输入正确的邮箱地址', 'warning')
        return false
      }

      if (!data.gender.value) {
        swal('', '请选择性别', 'warning')
        return false
      }

      return true
    },
    signup() {
      const self = this

      swal({
        title: '新账号注册',
        html:
          '<form id="signup-form">' +
            '<input type="text" name="username" class="swal2-input" placeholder="用户名"/>' + 
            '<input type="password" name="password" class="swal2-input" placeholder="密码"/>' + 
            '<input type="password" name="repeat" class="swal2-input" placeholder="重复密码"/>' + 
            '<input type="email" name="email" class="swal2-input" placeholder="邮箱"/>' +
            '<div class="swal2-radio">' +
              '<label>' +
                '<input type="radio" id="gender" name="gender" value="0"/><span>男</span>' +
              '</label>' +
              '<label>' +
                '<input type="radio" name="gender" value="1"/><span>女</span>' +
              '</label>' +
              '<label>' +
                '<input type="radio" name="gender" value="2"/><span>保密</span>' +
              '</label>' +
            '</div>' +
          '</form>',
        confirmButtonText: '注册',
        showLoaderOnConfirm: true,
        preConfirm() {
          return new Promise((resolve, reject) => {
            const form = document.querySelector('#signup-form').elements

            if (self._valiInput(form))
              request.put('/v1/api/user/user')
                .send({
                  username: form.username.value,
                  password: form.password.value,
                  email: form.email.value,
                  gender: form.gender.value
                })
                .end((err, res) => {
                  if (err)
                    console.error(err)

                  else {
                    if (res.status === 201) {
                      resolve()
                    } else {
                      reject('signup wrong')
                    }
                  }
                })
            else
              reject()
          })
        }
      }).then(() => {
        swal('', '注册成功！:)', 'success')
      }).catch(msg => {
        if (msg === 'signup wrong')
          swal('', '注册失败:(, 请稍后再试', 'wrong')
      })

      document.querySelector('#gender').name = 'gender'
    },
    signin() {
      const self = this

      swal({
        title: '用户登录',
        html:
          '<form id="signup-form">' +
            '<input type="text" name="username" class="swal2-input" placeholder="用户名/邮箱地址"/>' + 
            '<input type="password" name="password" class="swal2-input" placeholder="密码"/>' + 
          '</form>',
        confirmButtonText: '登录',
        showLoaderOnConfirm: true,
        preConfirm() {
          return new Promise((resolve, reject) => {
            const form = document.querySelector('#signup-form').elements

            request.post('/v1/api/user/login')
              .send({
                username: form.username.value,
                password: form.password.value
              })
              .end((err, res) => {
                if (err)
                  console.error(err)
                else {
                  resolve(res.body)
                }
              })
          })
        }
      }).then(body => {
        if (!body.isLogin)
          swal('', body.Error, 'error')
        else {
          self._user = body.user
          this.isSingnedin = true
        }
      })
    }
  },
  filters: {
    diffFilt(diffculty) {
      switch(diffculty) {
        case 0:
          return '初级'
        case 1:
          return '中级'
        case 2:
          return '高级'

      }
    }
  },
  created() {
    this._id = window.location.search.split('?')[1].split('=')[1]

    request.get('/v1/api/type/type/' + this._id)
      .query({
        populate: true
      })
      .end((err, res) => {
        if (err)
          console.error(err)
        else {
          this.type = res.body.ResultList[0]
        }
      })

    request.get('/v1/api/type/types')
      .query({
        limit: 99999,
        page: 1,
        keys: '_id+name',
        populate: true
      })
      .end((err, res) => {
        if (err)
          console.error(err)
        else {
          this.types = res.body.ResultList
        }
      })
  },
  mounted() {
    const self = this
    sr.reveal('.detail')

    window.addEventListener('scroll', this._throttle(function(e) {
      self.scrollTop = document.body.scrollTop
    }, 50))

    request.get('/v1/api/user/personal')
      .end((err, res) => {
        if (err)
          console.error(err)
        else {
          if (res.body.isLogin) {
            this._user = res.body.user
            this.isSingnedin = true
          }
        }
      })
  }
}).$mount('#root')
