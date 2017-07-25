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
      user: {},
      ownVdeios: [],
      pageIndex: 0,
      totaltimes: [],
      fixTop: '360px'
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
    payFor() {
      swal('', '请加QQ2080437116, :)', 'success')
    },
    editUser() {
      console.log(this.user)

      request.post('/v1/api/user/users')
        .send({
          id: this.user._id,
          update: {
            name: this.user.name,
            job: this.user.job,
            gender: this.user.gender,
            summary: this.user.summary
          }
        })
        .end((err, res) => {
          if (err)
            console.error(err)
          else {
            swal('', '修改成功', 'success')
          }
        })
    },
    toTop() {
      let _timer = setInterval(function() {
        const addr = document.body.scrollTop = document.body.scrollTop - 100

        if (addr <= 0) {
          clearInterval(_timer)
        }
      }, 10)
    },
    goToOrder() {
      window.location.href = '/order'
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
          self.user = body.user
          this.isSingnedin = true
        }
      })
    },
    _initCourse() {
      request.get('/v1/api/user/user/' + this.user._id)
        .query({
          keys: 'ownedvedios',
          populate: true
        })
        .end((err, res) => {
          if (err)
            console.error(err)
          else {
            this.ownVdeios = res.body.ResultList[0].ownedvedios

            this.ownVdeios.forEach((video, i) => {
              let ids = video.children.join('+')
              if (ids) {
                request.get('/v1/api/vedio/children')
                  .query({
                    ids
                  })
                  .end((err, res) => {
                    if (err)
                      console.error(err)
                    else {
                      let totalTime = 0

                      res.body.ResultList.forEach(item => {
                        totalTime += Number.parseInt(item.time)
                      })
                      console.log(totalTime)

                      const sss = totalTime / 1000

                      const hour = Number.parseInt(sss / 60 / 60)
                      const minute = Number.parseInt((sss - hour * 60 * 60) / 60)
                      const second = Number.parseInt(sss - hour * 60 * 60 - minute * 60)

                      this.totaltimes[i] = `${hour}时${minute}分${second}秒`
                    }
                  })
              } else {
                this.totaltimes[i] = '0时0分0秒'
              }
            })
          }
        })

    },
    changeAvatar(e) {
      const self = this

      let fileReader = new FileReader()
      fileReader.onload = function() {
        request.post('/v1/api/user/users')
          .send({
            id: self.user._id,
            update: {
              username: self.user.username,
              avatar: this.result
            }
          })
          .end((err, res) => {
            if (err)
              console.error(err)
            else {
              if (res.status === 201) {
                swal('', '修改头像成功', 'success')
                self.user.avatar = res.body.Id.avatar
              }
            }
          })
      }
      fileReader.readAsDataURL(e.target.files[0])
    },
    _initOrder() {

    }
  },
  filters: {
    fitGender(gender) {
      switch(gender) {
        case 0:
          return '男'
        case 1:
          return '女'
        case 2:
          return '保密'
      }
    },
    fitJob(job) {
      if (!job)
        return '无业游民~'

      return job
    }
  },
  watch: {
    pageIndex(nV, oV) {
      switch(nV) {
        case 1:
          this._initCourse()
          break
        case 2:
          this._initOrder()
          break
      }
    }
  },
  mounted() {
    const self = this
    sr.reveal('.detail')

    window.addEventListener('scroll', this._throttle(function(e) {
      self.scrollTop = document.body.scrollTop

      if (self.scrollTop >= 240) {
        self.fixTop = '120px'
      }
      else
        self.fixTop = 360 - self.scrollTop + 'px'
    }, 10))

    request.get('/v1/api/user/personal')
      .end((err, res) => {
        if (err)
          console.error(err)
        else {
          if (res.body.isLogin) {
            this.user = res.body.user
            this.isSingnedin = true

            console.log(this.user)
            if (/course/.test('course')) {
              this._initCourse()
              this.pageIndex = 1
            }
          }
        }
      })

  }
}).$mount('#root')
