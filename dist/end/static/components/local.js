var removeId = ''
var removeType = ''
var editId = ''
var editType = ''
;(function () {
  var page1 = 1
  var page2 = 1
  var page3 = 1
  var pageBtn1 = true
  var pageBtn2 = true
  var pageBtn3 = true

  var Btns1 = $('.target1-btns')
  var Btns2 = $('.target2-btns')
  var Btns3 = $('.target3-btns')
  var floorAdd1 = $('#addNewFloor1')
  var floorAdd2 = $('#addNewFloor2')
  var floorAdd3 = $('#addNewFloor3')
  var floorEdit1 = $('#editOldFloor1')
  var floorEdit2 = $('#editOldFloor2')
  var floorEdit3 = $('#editOldFloor3')
  var allRemove1 = $('#target1-mul-remove')
  var allRemove2 = $('#target2-mul-remove')
  var allRemove3 = $('#target3-mul-remove')

  eventHandle()
  ajaxToDate(1)
  _initSelectKeys()
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
      if (!pageBtn2) return
      pageBtn2 = false
      var nextPage = $(this).text() - 0 || 1
      page2 = nextPage
      ajaxToDate(2)

    })
    Btns3.delegate('.btn', 'click', function (e) {
      if (!pageBtn3) return
      pageBtn3 = false
      var nextPage = $(this).text() - 0 || 1
      page3 = nextPage
      ajaxToDate(3)

    })

    floorAdd1.click(function (e) {
      var addForm = $('#target1-add-form')
      var form = addForm.get(0).elements
      $.ajax({
        type: 'PUT',
        url: '/v1/api/location/province',
        data: {
          name: form.name.value
        }
      })
      .done(function (data) {
        addForm
          .closest('.modal-body')
          .siblings('.modal-footer')
          .find('#target1-add-close')
          .click()

        swal({text: '操作成功', timer: 1000})
        ajaxToDate(1)
        _initSelectKeys()
      })
      .fail(function (err) {
        swal('', 'something was wrong', 'error')
      })

    })
    floorAdd2.click(function (e) {
      var addForm = $('#target2-add-form')
      var form = addForm.get(0).elements
      $.ajax({
        type: 'PUT',
        url: '/v1/api/location/city',
        data: {
          province: form.province.value,
          name: form.name.value
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
        _initSelectKeys()
      })
      .fail(function (err) {
        swal('', 'something was wrong', 'error')
      })

    })
    floorAdd3.click(function (e) {
      var addForm = $('#target3-add-form')
      var form = addForm.get(0).elements
      $.ajax({
        type: 'PUT',
        url: '/v1/api/location/area',
        data: {
          city: form.city.value,
          name: form.name.value
        }
      })
      .done(function (data) {
        addForm
          .closest('.modal-body')
          .siblings('.modal-footer')
          .find('#target3-add-close')
          .click()

        swal({text: '操作成功', timer: 1000})
        ajaxToDate(3)
        _initSelectKeys()
      })
      .fail(function (err) {
        swal('', 'something was wrong', 'error')
      })

    })

    floorEdit1.click(function (e) {
      var editForm = $('#target1-edit-form')
      var form = editForm.get(0).elements
      $.ajax({
        type: 'POST',
        url: '/v1/api/location/provinces',
        data: {
          id: editId,
          update: {
            name: form.name.value
          }
        }
      })
      .done(function (data) {
        ajaxToDate(1)
        editForm
          .closest('.modal-body')
          .siblings('.modal-footer')
          .find('#target1-edit-close')
          .click()

        swal({text: '操作成功', timer: 1000})

      })
    })
    floorEdit2.click(function (e) {
      var editForm = $('#target2-edit-form')
      var form = editForm.get(0).elements
      $.ajax({
        type: 'POST',
        url: '/v1/api/location/cities',
        data: {
          id: editId,
          update: {
            name: form.name.value,
            province: form.province.value
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
    floorEdit3.click(function (e) {
      var editForm = $('#target3-edit-form')
      var form = editForm.get(0).elements
      $.ajax({
        type: 'POST',
        url: '/v1/api/location/areas',
        data: {
          id: editId,
          update: {
            name: form.name.value,
            city: form.city.value
          }
        }
      })
      .done(function (data) {
        ajaxToDate(3)
        editForm
          .closest('.modal-body')
          .siblings('.modal-footer')
          .find('#target3-edit-close')
          .click()

        swal({text: '操作成功', timer: 1000})

      })
    })

    allRemove1.on('click', function(e) {
      var ids = []
      DOMs.forms
        .eq(0)
        .find('input.childbox')
        .each(function (i, v) {
          if (v.checked === true) {
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
    allRemove3.on('click', function(e) {
      var ids = []
      console.log(DOMs.forms.eq(1).find('.childbox'))
      DOMs.forms
        .eq(2)
        .find('.childbox')
        .each(function (i, v) {
          if (v.checked === true) {
            ids.push(v.value)
          }
        })
      removeId = ids.join('+')
      removeType = 3
      removeOne()
    })
  }

  function ajaxToDate(type) {
    switch (type) {
      case 1:
        $.get('/v1/api/location/provinces', {
          keys: '_id+name',
          page: page1,
          limit: 10
        })
        .done(function (data) {
          // data = JSON.parse(data)
          data.LEN = 2
          data.type = type
          // data.ResultList.map(function (item) {
          //   delete item.Citys
          // })
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
        $.get('/v1/api/location/cities', {
          keys: '_id+name+province',
          page: page2,
          limit: 10,
          populate: true
        })
        .done(function (data) {
          data.LEN = 2
          data.type = type
          data.ResultList.map(function (item) {
            item.province = item.province.name
          })
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
      case 3:
        $.get('/v1/api/location/areas', {
          keys: '_id+name+city',
          page: page3,
          limit: 10,
          populate: true
        })
        .done(function (data) {
          data.LEN = 3
          data.type = type
          data.ResultList.map(function (item) {
            item.city = item.city.name
          })
          var tpl = $('#target1-table-template').html()
          var tmp = ejs.render(tpl, data)
          $('#target3-body').html(tmp)
          pageBtn3 = true
          changePageBtns(Btns3, 3, data.Total)
        })
        .fail(function (err) {
          swal('', 'something was wrong', 'error')
          pageBtn3 = true
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
        if (pages === 1) {
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
        if (pages === 1) {
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
                  ? page2 + 2
                  : page2 + 1)
            .end().eq(1).text(
              page2 === pages
                ? page2 - 2
                : page2 === 1
                  ? page2 + 2
                  : page2 + 1)
        }

        break
      case 3:
        if (pages === 1) {
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
              page3 === pages
                ? page3
                : page3 === 1
                  ? page3 + 2
                  : page3 + 1)
            .end().eq(2).text(
              page3 === pages
                ? page3 - 1
                : page3 === 1
                  ? page3 + 2
                  : page3 + 1)
            .end().eq(1).text(
              page3 === pages
                ? page3 - 2
                : page3 === 1
                  ? page3 + 2
                  : page3 + 1)
        }

        break
    }
  }

  function _initSelectKeys() {
    // add one
    $.get('/v1/api/location/provinces', {
      keys: '_id+name',
      limit: 99999,
      page: 1
    })
    .done(function (data) {
      var tmp = [
        '<% for (var i = 0, len = ResultList.length; i < len; i++) { %>',
        '<option value="<%= ResultList[i]._id%>"><%= ResultList[i].name %></option>',
        '<% } %>'
      ].join('')
      var tpl = ejs.render(tmp, data)
      $('[name="province"]')
        .html(tpl)
    })

    // add two
    $.get('/v1/api/location/cities', {
      keys: '_id+name+province',
      limit: 99999,
      page: 1,
      populate: true
    })
    .done(function (data) {
      var tmp = [
        '<% for (var i = 0, len = ResultList.length; i < len; i++) { %>',
        '<option value="<%= ResultList[i]._id %>"><%= ResultList[i].name %></option>',
        '<% } %>'
      ].join('')
      var tpl = ejs.render(tmp, data)
      $('[name="city"]')
        .html(tpl)
    })
  }

  function removeOne(e) {
    switch (removeType) {
      case 1:
        $.ajax({
          url: '/v1/api/location/provinces',
          type: 'DELETE',
          data: {
            ids: removeId
          }
        })
        .done(function (data) {
          ajaxToDate(1)
          $('#noneDisplayremove').click()
          swal({text: '操作成功', timer: 1000})
          removeId = ''
          removeType = ''
          _initSelectKeys()
        })
        .fail(function (err) {
          $('#noneDisplayremove').click()
          swal('', 'something was wrong', 'error')
        })
        break
      case 2:
        $.ajax({
          url: '/v1/api/location/cities',
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
          _initSelectKeys()
        })
        .fail(function (err) {
          $('#noneDisplayremove').click()
          swal('', 'something was wrong', 'error')
        })
        break
      case 3:
        $.ajax({
          url: '/v1/api/location/areas',
          type: 'DELETE',
          data: {
            ids: removeId
          }
        })
        .done(function (data) {
          ajaxToDate(3)
          $('#noneDisplayremove').click()
          swal({text: '操作成功', timer: 1000})
          removeId = ''
          removeType = ''
          _initSelectKeys()
        })
        .fail(function (err) {
          $('#noneDisplayremove').click()
          swal('', 'something was wrong', 'error')
        })
        break
    }
  }

  function editDate(type, id) {
    switch(type) {
      case 1:
        var editDialog = $('#editDialog1')
        $.get('/v1/api/location/province/' + id)
        .done(function (data) {
          console.log(data.ResultList[0])
          var forms = $('#target1-edit-form')
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
      case 2:
        var editDialog = $('#editDialog2')
        $.get('/v1/api/location/city/' + id)
        .done(function (data) {
          var forms = $('#target2-edit-form')
          for (var key in data.ResultList[0]) {
            var keyword = forms.get(0).elements[key]
            if (keyword) {
              keyword.value = data.ResultList[0][key]
            }
          }
        })
        .done()
        .fail(function (err) {
          swal('', 'something was wrong', 'error')
        })
        break
      case 3:
        var editDialog = $('#editDialog3')
        $.get('/v1/api/location/area/' + id)
        .done(function (data) {
          var forms = $('#target3-edit-form')
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
