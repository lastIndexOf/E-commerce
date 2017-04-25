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

    floorAdd.click(function (e) {
      var addForm = $('#target2-add-form')
      var form = addForm.get(0).elements
      $.ajax({
        type: 'POST',
        url: '/teenlong/src/v1/landlord/landlord.php',
        data: {
          Sex: form.Sex.value,
          Name: form.Name.value,
          Phone: form.Phone.value,
          WeixinCode: form.WeixinCode.value,
          QQCode: form.QQCode.value
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
        console.error(err)
      })

    })

    floorEdit.click(function (e) {
      var editForm = $('#target2-edit-form')
      var form = editForm.get(0).elements
      $.ajax({
        type: 'PUT',
        url: '/teenlong/src/v1/landlord/landlord.php',
        data: {
          Type: 0,
          Id: editId,
          Update: {
            Sex: form.Sex.value,
            Name: form.Name.value,
            Phone: form.Phone.value,
            WeixinCode: form.WeixinCode.value,
            QQCode: form.QQCode.value
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

    allRemove1.on('click', function(e) {
      var ids = []
      DOMs.forms
        .eq(0)
        .find('.childbox')
        .each(function (i, v) {
          if (v.selected === true) {
            ids.push(v.value)
          }
        })
      removeId = ids.join('+')
      removeType = 1
      removeOne()
    })
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
        $.get('/teenlong/src/v1/user/user.php', {
          Type: 1,
          Keys: 'Id+OpenId+NickName+Sex+Name+Phone+HeadImgUrl+Deadline',
          Page: page1,
          PageSize: 10,
          Search: {
            OpenId: '',
            Name: '',
            Sex: '',
            Phone: ''
          }
        })
        .done(function (data) {
          data = JSON.parse(data)
          data.LEN = 8
          data.type = type
          var tpl = $('#target1-table-template').html()
          var tmp = ejs.render(tpl, data)
          $('#target1-body').html(tmp)
          pageBtn1 = true
          changePageBtns(Btns1, 1, data.Total)
        })
        .fail(function (err) {
          swal('', 'something was wrong', 'error')
          pageBtn1 = true
        })
        break
      case 2:
        $.get('/teenlong/src/v1/landlord/landlord.php', {
          Type: 0,
          Keys: 'Id+Sex+Name+Phone+WeixinCode+QQCode',
          Page: page2,
          PageSize: 10,
          Search: {
            Id: ''
          }
        })
        .done(function (data) {
          data = JSON.parse(data)
          data.LEN = 6
          data.type = type
          var tpl = $('#target1-table-template').html()
          var tmp = ejs.render(tpl, data)
          $('#target2-body').html(tmp)
          pageBtn2 = true
          changePageBtns(Btns2, 2, data.Total)
        })
        .fail(function (err) {
          swal('', 'something was wrong', 'error')
          pageBtn2 = true
        })
        break
    }
  }

  function getAdminName() {
    $.get('/teenlong/src/v1/user/admin.php', {
      Type: 0,
      Keys: 'Name',
      Search: {
        Id: ''
      }
    })
    .done(function (data) {
      data = JSON.parse(data)
      var usrName = data.ResultList[0].Name
      DOMs.adminUser.text(usrName)
    })
    .fail(function (err) {
      console.error('wrong: ' + JSON.parse(err).Error)
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
          Btns
            .find('.btn')
            .hide()
            .eq(1)
            .show()
            .text(1)
            .end()
            .eq(2)
            .show()
            .text(2)
            .end()
            .eq(3)
            .show()
            .text(3)
        }
        else {
          Btns
            .find('.btn')
            .show()
            .eq(3)
            .text(page1 === pages ? page1 : (page1 === 1 ? page1 + 2 : page1 + 1))
            .end()
            .eq(2)
            .text(page1 === pages ? page1 - 1 : (page1 === 1 ? page1 + 1 : page1))
            .end()
            .eq(1)
            .text(page1 === pages ? page1 - 2 : (page1 === 1 ? page1 : page1 - 1))
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
          Btns
            .find('.btn')
            .hide()
            .eq(1)
            .show()
            .text(1)
            .end()
            .eq(2)
            .show()
            .text(2)
            .end()
            .eq(3)
            .show()
            .text(3)
        }
        else {
          Btns
            .find('.btn')
            .show()
            .eq(3)
            .text(page2 === pages ? page2 : (page2 === 1 ? page2 + 2 : page2 + 1))
            .end()
            .eq(2)
            .text(page2 === pages ? page2 - 1 : (page2 === 1 ? page2 + 1 : page2))
            .end()
            .eq(1)
            .text(page2 === pages ? page2 - 2 : (page2 === 1 ? page2 : page2 - 1))
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
          swal('', 'something was wrong', 'error')
        })
        break
      case 2:
        $.ajax({
          url: '/teenlong/src/v1/landlord/landlord.php',
          type: 'DELETE',
          data: {
            Type: 0,
            Search: {
              Id: removeId
            }
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
          swal('', 'something was wrong', 'error')
        })
        break
    }
  }

  function editDate(type, id) {
    switch(type) {
      case 2:
        var editDialog = $('#editDialog')
        $.get('/teenlong/src/v1/landlord/landlord.php', {
          Type: 0,
          Keys: '',
          Search: {
            Id: id
          }
        })
        .done(function (data) {
          data = JSON.parse(data)
          var forms = $('#target2-edit-form')
          console.log(forms.get(0).elements['Name'])
          for (var key in data.ResultList[0]) {
            var keyword = forms.get(0).elements[key]
            if (keyword) {
              keyword.value = data.ResultList[0][key]
            }
          }
        })
        .fail(function (err) {
          swal('', 'something was wrong', 'error')
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
