var removeId
var removeType
var editId
var editType
;(function () {
  var page1 = 1
  var page2 = 1
  var pageBtn1 = true
  var pageBtn2 = true

  var Btns1 = $('.target1-btns')
  var Btns2 = $('.target2-btns')
  var floorAdd = $('#addNewFloor')
  var floorEdit = $('#editOldFloor')
  var allRemove1 = $('#target1-mul-remove')
  var allRemove2 = $('#target2-mul-remove')

   // load image url ...
  var images = $('.image-chose-cls')
  var reader = new FileReader()
  var imgFileInput = $('.showPicReader')
  var base64Code


  eventHandle()
  ajaxToDate(1)
  getAdminName()
  addSearchKeys()

  function eventHandle() {
    DOMs.liTargets
      .not(':first-of-type')
      .one('click', function (e) {
        ajaxToDate($(this).data('type'))
      })

    Btns1.delegate('.btn', 'click', function (e) {
      if (!pageBtn1) return
      pageBtn1 = false
      var nextPage = $(this).text() - 0 || 1
      page1 = nextPage
      ajaxToDate(1)

    })
    Btns2.delegate('.btn', 'click', function (e) {
      if (!pageBtn1) return
      pageBtn2 = false
      var thisPage = $(this).text()
      // var firstPage = Btns2.eq(1).text()
      // var lastPage = Btns2.eq(3).text()
      var nextPage = thisPage - 0 || 1
      page2 = nextPage
      ajaxToDate(2)

    })

    imgFileInput.on('change', function (e) {
      console.log(1)
      reader.onload = function () {
        base64Code = reader.result
        imgFileInput.parent().next().attr('src', base64Code)
      }
      reader.readAsDataURL(this.files[0])
    })

    floorAdd.click(function (e) {
      var addForm = $('#target2-add-form')
      var form = addForm.get(0).elements
      $.ajax({
        type: 'PUT',
        url: '/v1/api/user/master',
        data: {
          name: form.name.value,
          username: form.username.value,
          password: form.password.value,
          avatar: base64Code,
          job: form.job.value,
          gender: form.gender.value
        }
      })
      .done(function (data) {
        addForm
          .closest('.modal-body')
          .siblings('.modal-footer')
          .find('#target2-add-close')
          .click()

        swal({text: '操作成功', timer: 1000})
        ajaxToDate(2)
      })
      .fail(function (err) {
        swal('', err.Error, 'error')
      })

    })

    floorEdit.click(function (e) {
      var editForm = $('#target2-edit-form')
      var form = editForm.get(0).elements
      $.ajax({
        type: 'POST',
        url: '/v1/api/user/masters',
        data: {
          id: editId,
          update: {
            name: form.name.value,
            username: form.username.value,
            avatar: base64Code,
            job: form.job.value,
            gender: form.gender.value
          }
        }
      })
      .done(function (data) {
        ajaxToDate(2)
        editForm
          .closest('.modal-body')
          .siblings('.modal-footer')
          .find('#target2-edit-close')
          .click()

        swal({text: '操作成功', timer: 1000})

      })
    })

    // allRemove1.on('click', function(e) {
    //   var ids = []
    //   DOMs.forms
    //     .eq(0)
    //     .find('.childbox')
    //     .each(function (i, v) {
    //       if (v.selected === true) {
    //         ids.push(v.value)
    //       }
    //     })
    //   removeId = ids.join('+')
    //   removeType = 1
    //   removeOne()
    // })
    allRemove2.on('click', function(e) {
      var ids = []
      DOMs.forms
        .eq(1)
        .find('.childbox')
        .each(function (i, v) {
          if (v.checked === true) {
            ids.push(v.value)
          }
        })
      removeId = ids.join('+')
      removeType = 2
      removeOne()
    })
  }

  function ajaxToDate(type) {
    switch (type) {
      case 1:
        $.get('/v1/api/user/users', {
          page: page1,
          limit: 10,
          keys: '_id+username+name+gender+avatar+phone+email+lastmodified'
        })
        .done(function (data) {
          data.LEN = 8
          data.type = type
          var tpl = $('#target1-table-template').html()
          var tmp = ejs.render(tpl, data)
          $('#target1-body').html(tmp)
          pageBtn1 = true
          changePageBtns(Btns1, 1, data.Total)
        })
        .fail(function (err) {
          swal('', JSON.parse(err).message, 'error')
          pageBtn1 = true
        })
        break
      case 2:
        $.get('/v1/api/user/masters', {
          page: page2,
          limit: 10,
          keys: '_id+username+name+gender+avatar'
        })
        .done(function (data) {
          data.LEN = 5
          data.type = type
          var tpl = $('#target1-table-template').html()
          var tmp = ejs.render(tpl, data)
          $('#target2-body').html(tmp)
          pageBtn2 = true
          changePageBtns(Btns2, 2, data.Total)
        })
        .fail(function (err) {
          swal('', JSON.parse(err).message, 'error')
          pageBtn2 = true
        })
        break
    }
  }

  function getAdminName() {
    $.get('/v1/api/admin/personal')
      .done(function (data) {
        var usrName = data.user.name
        DOMs.adminUser.text(usrName)
        $('#singOut').click(function(e) {
          window.location.href = '/v1/api/admin/logout/' + data.user._id
        })
      })
      .fail(function (err) {
        swal('', 'something was wrong', 'error')
      })
  }

  function addSearchKeys() {
    var tKeys1 = $('#target1-keyWords')
    var tKeys2 = $('#target2-keyWords')

    // $.get('/teenlong/src/v1/landlord/landlord.php', {
    //   Type:
    // })

  }

  function changePageBtns(Btns, type, totalPages) {
    // pages selector
    var pages = Math.ceil(totalPages / 10)
    switch(type) {
      case 1:
        if (pages <= 1) {
          Btns.find('.btn').hide().eq(1).show().text(1)
        }
        else if (pages === 2) {
          Btns.find('.btn').hide().eq(1).show().text(1).end().eq(2).show().text(2)
        }
        else if (pages === 3) {
          Btns.find('.btn').hide()
            .eq(1).show().text(1)
            .end().eq(2).show().text(2)
            .end().eq(3).show().text(3)
        }
        else {
          Btns.find('.btn').show()
            .eq(3).text(
              page1 === pages 
                ? page1 
                : page1 === 1 
                  ? page1 + 2 
                  : page1 + 1)
            .end().eq(2).text(
              page1 === pages 
                ? page1 - 1 
                : page1 === 1 
                  ? page1 + 1 
                  : page1)
            .end().eq(1).text(
              page1 === pages 
                ? page1 - 2 
                : page1 === 1 
                  ? page1 
                  : page1 - 1)
        }

        break
      case 2:
        if (pages <= 1) {
          Btns.find('.btn').hide().eq(1).show().text(1)
        }
        else if (pages === 2) {
          Btns.find('.btn').hide().eq(1).show().text(1).end().eq(2).show().text(2)
        }
        else if (pages === 3) {
          Btns.find('.btn').hide()
            .eq(1).show().text(1)
            .end().eq(2).show().text(2)
            .end().eq(3).show().text(3)
        }
        else {
          Btns.find('.btn').show()
            .eq(3).text(
              page2 === pages 
                ? page2 
                : page2 === 1 
                  ? page2 + 2 
                  : page2 + 1)
            .end().eq(2).text(
              page2 === pages 
                ? page2 - 1 
                : page2 === 1 
                  ? page2 + 1 
                  : page2)
            .end().eq(1).text(
              page2 === pages 
                ? page2 - 2 
                : page2 === 1 
                  ? page2 
                  : page2 - 1)
        }

        break
    }
  }

  function removeOne(e) {
    switch (removeType) {
      case 1:
        $.ajax({
          url: '/teenlong/src/v1/user/user.php',
          type: 'DELETE',
          data: {
            Type: 0,
            Search: {
              Id: removeId
            }
          }
        })
        .done(function (data) {
          ajaxToDate(1)
          swal({text: '操作成功', timer: 1000})
          removeId = ''
          removeType = ''
        })
        .fail(function (err) {
          swal('', JSON.parse(err).message, 'error')
        })
        break
      case 2:
        $.ajax({
          url: '/v1/api/user/masters',
          type: 'DELETE',
          data: {
            ids: removeId
          }
        })
        .done(function (data) {
          ajaxToDate(2)
          $('#noneDisplayremove').click()
          swal({text: '操作成功', timer: 1000})
          removeId = ''
          removeType = ''
        })
        .fail(function (err) {
          swal('', JSON.parse(err.responseText).Error, 'error')
        })
        break
    }
  }

  function editDate(type, id) {
    switch(type) {
      case 2:
        var editDialog = $('#editDialog')
        $.get('/v1/api/user/master/' + id)
          .done(function (data) {
            var forms = $('#target2-edit-form')
            console.log(forms.get(0).elements['Name'])
            for (var key in data.ResultList[0]) {
              var keyword = forms.get(0).elements[key]
              if (keyword && key !== 'avatar') {
                keyword.value = data.ResultList[0][key]
              }
              if (key === 'avatar') {
                base64Code = data.ResultList[0][key]
                images.eq(1).attr('src', base64Code)
              }
            }
          })
          .fail(function (err) {
            swal('', JSON.parse(err).message, 'error')
          })
        break
    }

  }

  function animateAlert(content, timer) {
    var alertFrame = $('.target-alert')
    alertFrame.text(content)
    alertFrame.css({ visibility: 'visible', opacity: 1.0 })
    setTimeout(() => {
      alertFrame.css({ opacity: 0 })
      setTimeout(function () {
        alertFrame.css({  visibility: 'hidden' })
      }, 400)
    }, timer)
  }

  window.removeOne = removeOne
  window.editDate = editDate
})()
