var removeId
var removeType
var editId
var editType
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

  // var floorAdd1 = $('#addNewFloor1')
  // var floorAdd2 = $('#addNewFloor2')
  // var floorAdd3 = $('#addNewFloor3')
  // var floorEdit1 = $('#editOldFloor1')
  // var floorEdit2 = $('#editOldFloor2')
  // var floorEdit3 = $('#editOldFloor3')
  // var allRemove1 = $('#target1-mul-remove')
  // var allRemove2 = $('#target2-mul-remove')
  // var allRemove3 = $('#target3-mul-remove')

  // load image url ...
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

    imgFileInput.on('change', function (e) {
      reader.onload = function () {
        base64Code = reader.result
        imgFileInput.parent().next().attr('src', base64Code)
      }
      reader.readAsDataURL(this.files[0])
    })

    // floorAdd1.click(function (e) {
    //   var addForm = $('#target1-add-form')
    //   var form = addForm.get(0).elements
    //   $.ajax({
    //     type: 'POST',
    //     url: '/teenlong/src/v1/house/house.php',
    //     data: {
    //       LandlordId: form.LandlordId.value,
    //       PurposeId: form.PurposeId.value,
    //       ShowPic: base64Code,
    //       Area: form.Area.value,
    //       DistrictId: form.DistrictId.value,
    //       Title: form.Title.value,
    //       Latitude: form.Latitude.value,
    //       Longitude: form.Longitude.value,
    //       Address: form.Address.value,
    //       Introduce: form.Introduce.value,
    //       RoomNumber: form.RoomNumber.value,
    //       LivingRoomNumber: form.LivingRoomNumber.value,
    //       BathroomNumber: form.BathroomNumber.value,
    //       KitchenNumber: form.KitchenNumber.value,
    //       BalconyNumber: form.BalconyNumber.value,
    //       PeopleNumber: form.PeopleNumber.value,
    //       RentType: form.RentType.value,
    //       Type: form.Type.value,
    //       Deposit: form.Deposit.value,
    //       Deadline: form.Deadline.value,
    //     }
    //   })
    //   .done(function (data) {
    //     addForm
    //       .closest('.modal-body')
    //       .siblings('.modal-footer')
    //       .find('#target1-add-close')
    //       .click()
    //
    //     swal({text: '操作成功', timer: 1000})
    //     ajaxToDate(1)
    //   })
    //   .fail(function (err) {
    //     console.error(err.responseText)
    //   })
    //
    // })
    // floorAdd2.click(function (e) {
    //   var addForm = $('#target2-add-form')
    //   var form = addForm.get(0).elements
    //   $.ajax({
    //     type: 'POST',
    //     url: '/teenlong/src/v1/house/house_photos.php',
    //     data: {
    //       HouseId: form.HouseId.value,
    //       Url: base64Code
    //     }
    //   })
    //   .done(function (data) {
    //     addForm
    //       .closest('.modal-body')
    //       .siblings('.modal-footer')
    //       .find('#target2-add-close')
    //       .click()
    //
    //     swal({text: '操作成功', timer: 1000})
    //     ajaxToDate(2)
    //   })
    //   .fail(function (err) {
    //     console.error(err.responseText)
    //   })
    //
    // })
    // floorAdd3.click(function (e) {
    //   var addForm = $('#target3-add-form')
    //   var form = addForm.get(0).elements
    //   $.ajax({
    //     type: 'POST',
    //     url: '/teenlong/src/v1/house/purpose.php',
    //     data: {
    //       Name: form.Name.value,
    //       Img: base64Code
    //     }
    //   })
    //   .done(function (data) {
    //     addForm
    //       .closest('.modal-body')
    //       .siblings('.modal-footer')
    //       .find('#target3-add-close')
    //       .click()
    //
    //     swal({text: '操作成功', timer: 1000})
    //     ajaxToDate(3)
    //   })
    //   .fail(function (err) {
    //     console.error(err)
    //   })
    //
    // })
    //
    // floorEdit1.click(function (e) {
    //   var editForm = $('#target1-edit-form')
    //   var form = editForm.get(0).elements
    //   $.ajax({
    //     type: 'PUT',
    //     url: '/teenlong/src/v1/house/house.php',
    //     data: {
    //       Type: 0,
    //       Id: editId,
    //       Update: {
    //         LandlordId: form.LandlordId.value,
    //         PurposeId: form.PurposeId.value,
    //         ShowPic: base64Code,
    //         Area: form.Area.value,
    //         DistrictId: form.DistrictId.value,
    //         Title: form.Title.value,
    //         Latitude: form.Latitude.value,
    //         Longitude: form.Longitude.value,
    //         Address: form.Address.value,
    //         Introduce: form.Introduce.value,
    //         RoomNumber: form.RoomNumber.value,
    //         LivingRoomNumber: form.LivingRoomNumber.value,
    //         BathroomNumber: form.BathroomNumber.value,
    //         KitchenNumber: form.KitchenNumber.value,
    //         BalconyNumber: form.BalconyNumber.value,
    //         PeopleNumber: form.PeopleNumber.value,
    //         RentType: form.RentType.value,
    //         Type: form.Type.value,
    //         Deposit: form.Deposit.value,
    //         Deadline: form.Deadline.value,
    //       }
    //     }
    //   })
    //   .done(function (data) {
    //     ajaxToDate(1)
    //     editForm
    //       .closest('.modal-body')
    //       .siblings('.modal-footer')
    //       .find('#target1-edit-close')
    //       .click()
    //
    //     swal({text: '操作成功', timer: 1000})
    //
    //   })
    // })
    // floorEdit2.click(function (e) {
    //   var editForm = $('#target2-edit-form')
    //   var form = editForm.get(0).elements
    //   $.ajax({
    //     type: 'PUT',
    //     url: '/teenlong/src/v1/house/house_photos.php',
    //     data: {
    //       Type: 0,
    //       Id: editId,
    //       Update: {
    //         HouseId: form.HouseId.value,
    //         Url: base64Code
    //       }
    //     }
    //   })
    //   .done(function (data) {
    //     ajaxToDate(2)
    //     editForm
    //       .closest('.modal-body')
    //       .siblings('.modal-footer')
    //       .find('#target2-edit-close')
    //       .click()
    //
    //     swal({text: '操作成功', timer: 1000})
    //
    //   })
    // })
    // floorEdit3.click(function (e) {
    //   var editForm = $('#target3-edit-form')
    //   var form = editForm.get(0).elements
    //   $.ajax({
    //     type: 'PUT',
    //     url: '/teenlong/src/v1/house/purpose.php',
    //     data: {
    //       Type: 0,
    //       Id: editId,
    //       Update: {
    //         Name: form.Name.value,
    //         Img: base64Code
    //       }
    //     }
    //   })
    //   .done(function (data) {
    //     ajaxToDate(3)
    //     editForm
    //       .closest('.modal-body')
    //       .siblings('.modal-footer')
    //       .find('#target3-edit-close')
    //       .click()
    //
    //     swal({text: '操作成功', timer: 1000})
    //
    //   })
    // })
    //
    // allRemove1.on('click', function(e) {
    //   var ids = []
    //   DOMs.forms
    //     .eq(0)
    //     .find('input.childbox')
    //     .each(function (i, v) {
    //       if (v.checked === true) {
    //         ids.push(v.value)
    //       }
    //     })
    //   removeId = ids.join('+')
    //   removeType = 1
    //   removeOne()
    // })
    // allRemove2.on('click', function(e) {
    //   var ids = []
    //   DOMs.forms
    //     .eq(1)
    //     .find('.childbox')
    //     .each(function (i, v) {
    //       if (v.checked === true) {
    //         ids.push(v.value)
    //       }
    //     })
    //   removeId = ids.join('+')
    //   removeType = 2
    //   removeOne()
    // })
    // allRemove3.on('click', function(e) {
    //   var ids = []
    //   DOMs.forms
    //     .eq(1)
    //     .find('.childbox')
    //     .each(function (i, v) {
    //       if (v.checked === true) {
    //         ids.push(v.value)
    //       }
    //     })
    //   removeId = ids.join('+')
    //   removeType = 3
    //   removeOne()
    // })
  }

  function ajaxToDate(type) {
    switch (type) {
      case 1:
        $.get('/teenlong/src/v1/other/collections.php', {
          Type: 0,
          Keys: 'Id+HouseName+UserName+UserNickName',
          Page: page1,
          PageSize: 10,
          Search: {
            Id: ''
          }
        })
        .done(function (data) {
          data = JSON.parse(data)
          data.LEN = 4
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
        $.get('/teenlong/src/v1/other/read_records.php', {
          Type: 0,
          Keys: 'Id+HouseId+Time+UserId+Day+Number',
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
          // data.ResultList.map(function (item) {
          //   delete item.Citys
          // })
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
        $.get('/teenlong/src/v1/other/login_records.php', {
          Type: 0,
          Keys: 'Id+Ip+Time+UserId+Day+Number',
          Page: page3,
          PageSize: 10,
          Search: {
            Id: ''
          }
        })
        .done(function (data) {
          data = JSON.parse(data)
          data.LEN = 3
          data.type = type
          // data.ResultList.map(function (item) {
          //   delete item.Citys
          // })
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
            .text(page1 === pages
                ? page1
                : (page1 === 1
                  ? page1 + 2
                  : page1 + 1))
            .end()
            .eq(2)
            .text(page1 === pages
              ? page1 - 1
              : (page1 === 1
                ? page1 + 1
                : page1))
            .end()
            .eq(1)
            .text(page1 === pages
              ? page1 - 2
              : (page1 === 1
                ? page1
                : page1 - 1))
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
            .text(page2 === pages ? page2 - 1 : (page2 === 1 ? page2 + 2 : page2 + 1))
            .end()
            .eq(1)
            .text(page2 === pages ? page2 - 2 : (page2 === 1 ? page2 + 2 : page2 + 1))
        }

        break
      case 3:
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
            .text(page3 === pages ? page3 : (page3 === 1 ? page3 + 2 : page3 + 1))
            .end()
            .eq(2)
            .text(page3 === pages ? page3 - 1 : (page3 === 1 ? page3 + 2 : page3 + 1))
            .end()
            .eq(1)
            .text(page3 === pages ? page3 - 2 : (page3 === 1 ? page3 + 2 : page3 + 1))
        }

        break
    }
  }

  function removeOne(e) {
    switch (removeType) {
      case 1:
        $.ajax({
          url: '/teenlong/src/v1/house/house.php',
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
          $('#noneDisplayremove').click()
          swal({text: '操作成功', timer: 1000})
          removeId = ''
          removeType = ''
        })
        .fail(function (err) {
          $('#noneDisplayremove').click()
          swal('', 'something was wrong', 'error')
        })
        break
      case 2:
        $.ajax({
          url: '/teenlong/src/v1/house/house_photos.php',
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
          $('#noneDisplayremove').click()
          swal('', 'something was wrong', 'error')
        })
        break
      case 3:
        $.ajax({
          url: '/teenlong/src/v1/house/purpose.php',
          type: 'DELETE',
          data: {
            Type: 0,
            Search: {
              Id: removeId
            }
          }
        })
        .done(function (data) {
          ajaxToDate(3)
          $('#noneDisplayremove').click()
          swal({text: '操作成功', timer: 1000})
          removeId = ''
          removeType = ''
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
        $.get('/teenlong/src/v1/house/house.php', {
          Type: 0,
          Keys: '',
          Search: {
            Id: id
          }
        })
        .done(function (data) {
          data = JSON.parse(data)
          var forms = $('#target1-edit-form')
          for (var key in data.ResultList[0]) {
            var keyword = forms.get(0).elements[key]
            if (keyword) {
              keyword.value = data.ResultList[0][key]
            }
          }
        })
        .fail(function (err) {
          console.error(err.responseText)
        })
        break
      case 2:
        var editDialog = $('#editDialog2')
        $.get('/teenlong/src/v1/house/house_photos.php', {
          Type: 0,
          Keys: '',
          Search: {
            Id: id
          }
        })
        .done(function (data) {
          data = JSON.parse(data)
          var forms = $('#target2-edit-form')
          for (var key in data.ResultList[0]) {
            var keyword = forms.get(0).elements[key]
            if (keyword) {
              keyword.value = data.ResultList[0][key]
            }
          }
        })
        .fail(function (err) {
          console.error(err.responseText)
        })
        break
      case 3:
        var editDialog = $('#editDialog3')
        $.get('/teenlong/src/v1/house/purpose.php', {
          Type: 0,
          Keys: '',
          Search: {
            Id: id
          }
        })
        .done(function (data) {
          data = JSON.parse(data)
          var forms = $('#target3-edit-form')
          for (var key in data.ResultList[0]) {
            var keyword = forms.get(0).elements[key]
            if (keyword) {
              keyword.value = data.ResultList[0][key]
            }
          }
        })
        .fail(function (err) {
          console.error(err.responseText)
        })
        break
    }

  }

  function animateAlert(content, timer) {
    var alertFrame = $('.target-alert')
    alertFrame.text(content)
    alertFrame.css({ visibility: 'visible', opacity: 1.0 })
    setTimeout(function() {
      alertFrame.css({ opacity: 0 })
      setTimeout(function () {
        alertFrame.css({  visibility: 'hidden' })
      }, 400)
    }, timer)
  }

  window.removeOne = removeOne
  window.editDate = editDate

})()
