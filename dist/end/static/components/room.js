var removeId
var removeType
var editId
var editType
;(function () {
  var page1 = 1
  var page2 = 1
  var page3 = 1
  var page4 = 1
  var page5 = 1
  var page6 = 1
  var pageBtn1 = true
  var pageBtn2 = true
  var pageBtn3 = true
  var pageBtn4 = true
  var pageBtn5 = true
  var pageBtn6 = true

  var Btns1 = $('.target1-btns')
  var Btns2 = $('.target2-btns')
  var Btns3 = $('.target3-btns')
  var Btns4 = $('.target4-btns')
  var Btns5 = $('.target5-btns')
  var Btns6 = $('.target6-btns')
  var floorAdd1 = $('#addNewFloor1')
  var floorAdd2 = $('#addNewFloor2')
  var floorAdd3 = $('#addNewFloor3')
  var floorAdd4 = $('#addNewFloor4')
  var floorAdd5 = $('#addNewFloor5')
  var floorAdd6 = $('#addNewFloor6')
  var floorEdit1 = $('#editOldFloor1')
  var floorEdit2 = $('#editOldFloor2')
  var floorEdit3 = $('#editOldFloor3')
  var floorEdit4 = $('#editOldFloor4')
  var floorEdit5 = $('#editOldFloor5')
  var floorEdit6 = $('#editOldFloor6')
  var allRemove1 = $('#target1-mul-remove')
  var allRemove2 = $('#target2-mul-remove')
  var allRemove3 = $('#target3-mul-remove')
  var allRemove4 = $('#target4-mul-remove')
  var allRemove5 = $('#target5-mul-remove')
  var allRemove6 = $('#target6-mul-remove')

  // load image url ...
  var images = $('.image-chose-cls')
  var reader = new FileReader()
  var imgFileInput = $('.showPicReader')
  var base64Code

  eventHandle()
  ajaxToDate(1)
  getAdminName()
  addSearchKeys()
  _initSelectKeys()


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
    Btns4.delegate('.btn', 'click', function (e) {
      if (!pageBtn4) return
      pageBtn4 = false
      var nextPage = $(this).text() - 0 || 1
      page4 = nextPage
      ajaxToDate(4)

    })
    Btns5.delegate('.btn', 'click', function (e) {
      if (!pageBtn5) return
      pageBtn5 = false
      var nextPage = $(this).text() - 0 || 1
      pag53 = nextPage
      ajaxToDate(5)

    })
    Btns6.delegate('.btn', 'click', function (e) {
      if (!pageBtn6) return
      pageBtn6 = false
      var nextPage = $(this).text() - 0 || 1
      page6 = nextPage
      ajaxToDate(6)

    })

    imgFileInput.on('change', function (e) {
      reader.onload = function () {
        base64Code = reader.result
        imgFileInput.parent().next().attr('src', base64Code)
      }
      reader.readAsDataURL(this.files[0])
    })

    floorAdd1.click(function (e) {
      var addForm = $('#target1-add-form')
      var form = addForm.get(0).elements
      $.ajax({
        type: 'POST',
        url: '/teenlong/src/v1/house/house.php',
        data: {
          LandlordId: form.LandlordId.value,
          PurposeId: form.PurposeId.value,
          ShowPic: base64Code,
          Area: form.Area.value,
          DistrictId: form.DistrictId.value,
          Title: form.Title.value,
          Latitude: form.Latitude.value,
          Longitude: form.Longitude.value,
          Address: form.Address.value,
          Introduce: form.Introduce.value,
          RoomNumber: form.RoomNumber.value,
          LivingRoomNumber: form.LivingRoomNumber.value,
          BathroomNumber: form.BathroomNumber.value,
          KitchenNumber: form.KitchenNumber.value,
          BalconyNumber: form.BalconyNumber.value,
          PeopleNumber: form.PeopleNumber.value,
          RentType: form.RentType.value,
          Type: form.Type.value,
          Deposit: form.Deposit.value,
          Deadline: form.Deadline.value,
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
        type: 'POST',
        url: '/teenlong/src/v1/house/house_photos.php',
        data: {
          HouseId: form.HouseId.value,
          Url: base64Code
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
        type: 'POST',
        url: '/teenlong/src/v1/house/purpose.php',
        data: {
          Name: form.Name.value,
          Img: base64Code
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
    floorAdd4.click(function (e) {
      var addForm = $('#target4-add-form')
      var form = addForm.get(0).elements
      $.ajax({
        type: 'POST',
        url: '/teenlong/src/v1/house/house_beds.php',
        data: {
          HouseId: form.HouseId.value,
          Width: form.Width.value,
          Length: form.Length.value,
          Name: form.Name.value,
          Number: form.Number.value
        }
      })
      .done(function (data) {
        addForm
          .closest('.modal-body')
          .siblings('.modal-footer')
          .find('#target4-add-close')
          .click()

        swal({text: '操作成功', timer: 1000})
        ajaxToDate(4)
        _initSelectKeys()
      })
      .fail(function (err) {
        swal('', 'something was wrong', 'error')
      })

    })
    floorAdd5.click(function (e) {
      var addForm = $('#target5-add-form')
      var form = addForm.get(0).elements
      $.ajax({
        type: 'POST',
        url: '/teenlong/src/v1/house/infrastructure.php',
        data: {
          Name: form.Name.value,
          Code: form.Code.value
        }
      })
      .done(function (data) {
        addForm
          .closest('.modal-body')
          .siblings('.modal-footer')
          .find('#target5-add-close')
          .click()

        swal({text: '操作成功', timer: 1000})
        ajaxToDate(5)
        _initSelectKeys()
      })
      .fail(function (err) {
        swal('', 'something was wrong', 'error')
      })

    })
    floorAdd6.click(function (e) {
      var addForm = $('#target6-add-form')
      var form = addForm.get(0).elements
      $.ajax({
        type: 'POST',
        url: '/teenlong/src/v1/house/house_infrastructures.php',
        data: {
          HouseId: form.HouseId.value,
          InfrastructureId: form.InfrastructureId.value
        }
      })
      .done(function (data) {
        addForm
          .closest('.modal-body')
          .siblings('.modal-footer')
          .find('#target6-add-close')
          .click()

        swal({text: '操作成功', timer: 1000})
        ajaxToDate(6)
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
        type: 'PUT',
        url: '/teenlong/src/v1/house/house.php',
        data: {
          Type: 0,
          Id: editId,
          Update: {
            LandlordId: form.LandlordId.value,
            PurposeId: form.PurposeId.value,
            ShowPic: base64Code,
            Area: form.Area.value,
            DistrictId: form.DistrictId.value,
            Title: form.Title.value,
            Latitude: form.Latitude.value,
            Longitude: form.Longitude.value,
            Address: form.Address.value,
            Introduce: form.Introduce.value,
            RoomNumber: form.RoomNumber.value,
            LivingRoomNumber: form.LivingRoomNumber.value,
            BathroomNumber: form.BathroomNumber.value,
            KitchenNumber: form.KitchenNumber.value,
            BalconyNumber: form.BalconyNumber.value,
            PeopleNumber: form.PeopleNumber.value,
            RentType: form.RentType.value,
            Type: form.Type.value,
            Deposit: form.Deposit.value,
            Deadline: form.Deadline.value,
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
      .fail(function (err) {
        swal('', 'something was wrong', 'error')

      })
    })
    floorEdit2.click(function (e) {
      var editForm = $('#target2-edit-form')
      var form = editForm.get(0).elements
      $.ajax({
        type: 'PUT',
        url: '/teenlong/src/v1/house/house_photos.php',
        data: {
          Type: 0,
          Id: editId,
          Update: {
            HouseId: form.HouseId.value,
            Url: base64Code
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
      .fail(function (err) {
        swal('', 'something was wrong', 'error')

      })
    })
    floorEdit3.click(function (e) {
      var editForm = $('#target3-edit-form')
      var form = editForm.get(0).elements
      $.ajax({
        type: 'PUT',
        url: '/teenlong/src/v1/house/purpose.php',
        data: {
          Type: 0,
          Id: editId,
          Update: {
            Name: form.Name.value,
            Img: base64Code
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
      .fail(function (err) {
        swal('', 'something was wrong', 'error')

      })
    })
    floorEdit4.click(function (e) {
      var editForm = $('#target4-edit-form')
      var form = editForm.get(0).elements
      $.ajax({
        type: 'PUT',
        url: '/teenlong/src/v1/house/house_beds.php',
        data: {
          Type: 0,
          Id: editId,
          Update: {
            HouseId: form.HouseId.value,
            Width: form.Width.value,
            Length: form.Length.value,
            Name: form.Name.value,
            Number: form.Number.value
          }
        }
      })
      .done(function (data) {
        ajaxToDate(4)
        editForm
          .closest('.modal-body')
          .siblings('.modal-footer')
          .find('#target4-edit-close')
          .click()

        swal({text: '操作成功', timer: 1000})

      })
      .fail(function (err) {
        swal('', 'something was wrong', 'error')

      })
    })
    floorEdit5.click(function (e) {
      var editForm = $('#target5-edit-form')
      var form = editForm.get(0).elements
      $.ajax({
        type: 'PUT',
        url: '/teenlong/src/v1/house/infrastructure.php',
        data: {
          Type: 0,
          Id: editId,
          Update: {
            Name: form.Name.value,
            Code: form.Code.value
          }
        }
      })
      .done(function (data) {
        ajaxToDate(5)
        editForm
          .closest('.modal-body')
          .siblings('.modal-footer')
          .find('#target5-edit-close')
          .click()

        swal({text: '操作成功', timer: 1000})

      })
      fail(function (err) {
        swal('', 'something was wrong', 'error')
      })
    })
    floorEdit6.click(function (e) {
      var editForm = $('#target6-edit-form')
      var form = editForm.get(0).elements
      $.ajax({
        type: 'PUT',
        url: '/teenlong/src/v1/house/house_infrastructures.php',
        data: {
          Type: 0,
          Id: editId,
          Update: {
            HouseId: form.HouseId.value,
            InfrastructureId: form.InfrastructureId.value
          }
        }
      })
      .done(function (data) {
        ajaxToDate(6)
        editForm
          .closest('.modal-body')
          .siblings('.modal-footer')
          .find('#target6-edit-close')
          .click()

        swal({text: '操作成功', timer: 1000})

      })
      .fail(function (err) {
        swal('', 'something was wrong', 'error')

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
    allRemove4.on('click', function(e) {
      var ids = []
      DOMs.forms
        .eq(3)
        .find('.childbox')
        .each(function (i, v) {
          if (v.checked === true) {
            ids.push(v.value)
          }
        })
      removeId = ids.join('+')
      removeType = 4
      removeOne()
    })
    allRemove5.on('click', function(e) {
      var ids = []
      DOMs.forms
        .eq(4)
        .find('.childbox')
        .each(function (i, v) {
          if (v.checked === true) {
            ids.push(v.value)
          }
        })
      removeId = ids.join('+')
      removeType = 5
      removeOne()
    })
    allRemove6.on('click', function(e) {
      var ids = []
      DOMs.forms
        .eq(5)
        .find('.childbox')
        .each(function (i, v) {
          if (v.checked === true) {
            ids.push(v.value)
          }
        })
      removeId = ids.join('+')
      removeType = 6
      removeOne()
    })
  }

  function ajaxToDate(type) {
    switch (type) {
      case 1:
        $.get('/teenlong/src/v1/house/house.php', {
          Type: 0,
          Keys: 'Id+PurposeId+ShowPicUrl+DistrictText+IsThroughAudit+Title',
          Page: page1,
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
        $.get('/teenlong/src/v1/house/house_photos.php', {
          Type: 0,
          Keys: 'Id+HouseId+Url',
          Page: page2,
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
        $.get('/teenlong/src/v1/house/purpose.php', {
          Type: 0,
          Keys: 'Id+Name+Img',
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
      case 4:
        $.get('/teenlong/src/v1/house/house_beds.php', {
          Type: 0,
          Keys: 'Id+HouseId+Width+Length+Name+Number',
          Page: page4,
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
          $('#target4-body').html(tmp)
          pageBtn4 = true
          changePageBtns(Btns4, 4, data.Total)
        })
        .fail(function (err) {
          swal('', 'something was wrong', 'error')
          pageBtn4 = true
        })
        break
      case 5:
        $.get('/teenlong/src/v1/house/infrastructure.php', {
          Type: 0,
          Keys: 'Id+Name+Code',
          Page: page5,
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
          $('#target5-body').html(tmp)
          pageBtn5 = true
          changePageBtns(Btns5, 5, data.Total)
        })
        .fail(function (err) {
          swal('', 'something was wrong', 'error')
          pageBtn5 = true
        })
        break
      case 6:
        $.get('/teenlong/src/v1/house/house_infrastructures.php', {
          Type: 0,
          Keys: 'Id+HouseId+InfrastructureId+Code+Name',
          Page: page6,
          PageSize: 10,
          Search: {
            Id: ''
          }
        })
        .done(function (data) {
          data = JSON.parse(data)
          data.LEN = 5
          data.type = type
          // data.ResultList.map(function (item) {
          //   delete item.Citys
          // })
          var tpl = $('#target1-table-template').html()
          var tmp = ejs.render(tpl, data)
          $('#target6-body').html(tmp)
          pageBtn6 = true
          changePageBtns(Btns6, 6, data.Total)
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
      case 4:
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
            .text(page4 === pages ? page4 : (page4 === 1 ? page4 + 2 : page4 + 1))
            .end()
            .eq(2)
            .text(page4 === pages ? page4 - 1 : (page4 === 1 ? page4 + 2 : page4 + 1))
            .end()
            .eq(1)
            .text(page4 === pages ? page4 - 2 : (page4 === 1 ? page4 + 2 : page4 + 1))
        }

        break
      case 5:
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
            .text(page5 === pages ? page5 : (page4 === 1 ? page5 + 2 : page5 + 1))
            .end()
            .eq(2)
            .text(page5 === pages ? page5 - 1 : (page4 === 1 ? page5 + 2 : page5 + 1))
            .end()
            .eq(1)
            .text(page5 === pages ? page5 - 2 : (page4 === 1 ? page5 + 2 : page5 + 1))
        }

        break
      case 6:
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
            .text(page6 === pages ? page6 : (page3 === 1 ? page6 + 2 : page6 + 1))
            .end()
            .eq(2)
            .text(page6 === pages ? page6 - 1 : (page3 === 1 ? page6 + 2 : page6 + 1))
            .end()
            .eq(1)
            .text(page6 === pages ? page6 - 2 : (page3 === 1 ? page6 + 2 : page6 + 1))
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
          _initSelectKeys()
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
          _initSelectKeys()
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
          _initSelectKeys()
        })
        .fail(function (err) {
          $('#noneDisplayremove').click()
          swal('', 'something was wrong', 'error')
        })
        break
      case 4:
        $.ajax({
          url: '/teenlong/src/v1/house/house_beds.php',
          type: 'DELETE',
          data: {
            Type: 0,
            Search: {
              Id: removeId
            }
          }
        })
        .done(function (data) {
          ajaxToDate(4)
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
      case 5:
        $.ajax({
          url: '/teenlong/src/v1/house/infrastructure.php',
          type: 'DELETE',
          data: {
            Type: 0,
            Search: {
              Id: removeId
            }
          }
        })
        .done(function (data) {
          ajaxToDate(5)
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
      case 6:
        $.ajax({
          url: '/teenlong/src/v1/house/house_infrastructures.php',
          type: 'DELETE',
          data: {
            Type: 0,
            Search: {
              Id: removeId
            }
          }
        })
        .done(function (data) {
          ajaxToDate(6)
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

  function _initSelectKeys() {
    // add one
    $.get('/teenlong/src/v1/place/province.php', {
      Type: 0,
      Keys: 'Id+Name',
      Search: {
        Id: ''
      }
    })
    .done(function (data) {
      data = JSON.parse(data)
      var tmp = [
        '<% for (var i = 0, len = ResultList.length; i < len; i++) { %>',
        '<option value="<%= ResultList[i].Id %>"><%= ResultList[i].Name %></option>',
        '<% } %>'
      ].join('')
      var tpl = ejs.render(tmp, data)
      $('[name="ProvinceId"]')
        .html(tpl)
    })

    // add two
    $.get('/teenlong/src/v1/place/city.php', {
      Type: 0,
      Keys: 'Id+Name+Province',
      Search: {
        Id: ''
      }
    })
    .done(function (data) {
      data = JSON.parse(data)
      var tmp = [
        '<% for (var i = 0, len = ResultList.length; i < len; i++) { %>',
        '<option value="<%= ResultList[i].Id %>"><%= ResultList[i].Name %></option>',
        '<% } %>'
      ].join('')
      var tpl = ejs.render(tmp, data)
      $('[name="CityId"]')
        .html(tpl)
    })

    // add three
    $.get('/teenlong/src/v1/landlord/landlord.php', {
      Type: 0,
      Keys: 'Id+Name',
      Search: {
        Id: ''
      }
    })
    .done(function (data) {
      data = JSON.parse(data)
      var tmp = [
        '<% for (var i = 0, len = ResultList.length; i < len; i++) { %>',
        '<option value="<%= ResultList[i].Id %>"><%= ResultList[i].Name %></option>',
        '<% } %>'
      ].join('')
      var tpl = ejs.render(tmp, data)
      $('[name="LandlordId"]')
      .html(tpl)
    })

    $.get('/teenlong/src/v1/house/purpose.php', {
      Type: 0,
      Keys: 'Id+Name',
      Search: {
        Id: ''
      }
    })
    .done(function (data) {
      data = JSON.parse(data)
      var tmp = [
        '<% for (var i = 0, len = ResultList.length; i < len; i++) { %>',
        '<option value="<%= ResultList[i].Id %>"><%= ResultList[i].Name %></option>',
        '<% } %>'
      ].join('')
      var tpl = ejs.render(tmp, data)
      $('[name="PurposeId"]')
      .html(tpl)
    })

    $.get('/teenlong/src/v1/place/district.php', {
      Type: 0,
      Keys: 'Id+Name',
      Search: {
        Id: ''
      }
    })
    .done(function (data) {
      data = JSON.parse(data)
      var tmp = [
        '<% for (var i = 0, len = ResultList.length; i < len; i++) { %>',
        '<option value="<%= ResultList[i].Id %>"><%= ResultList[i].Name %></option>',
        '<% } %>'
      ].join('')
      var tpl = ejs.render(tmp, data)
      $('[name="DistrictId"]')
      .html(tpl)
    })

    // add four
    $.get('/teenlong/src/v1/house/house.php', {
      Type: 0,
      Keys: 'Id+Title',
      Search: {
        Id: ''
      }
    })
    .done(function (data) {
      data = JSON.parse(data)
      var tmp = [
        '<% for (var i = 0, len = ResultList.length; i < len; i++) { %>',
        '<option value="<%= ResultList[i].Id %>"><%= ResultList[i].Title %></option>',
        '<% } %>'
      ].join('')
      var tpl = ejs.render(tmp, data)
      $('[name="HouseId"]')
      .html(tpl)
    })

    // add five
    $.get('/teenlong/src/v1/house/infrastructure.php', {
      Type: 0,
      Keys: 'Id+Name',
      Search: {
        Id: ''
      }
    })
    .done(function (data) {
      data = JSON.parse(data)
      var tmp = [
        '<% for (var i = 0, len = ResultList.length; i < len; i++) { %>',
        '<option value="<%= ResultList[i].Id %>"><%= ResultList[i].Name %></option>',
        '<% } %>'
      ].join('')
      var tpl = ejs.render(tmp, data)
      $('[name="InfrastructureId"]')
      .html(tpl)
    })

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
            if (keyword && key !== 'ShowPicUrl') {
              keyword.value = data.ResultList[0][key]
            }
            if (key === 'ShowPicUrl') {
              base64Code = data.ResultList[0][key]
              images.eq(3).attr('src', base64Code)
            }
          }
        })
        .fail(function (err) {
          swal('', 'something was wrong', 'error')
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
            if (keyword && key !== 'Url') {
              keyword.value = data.ResultList[0][key]
            }
            if (key === 'Url') {
              base64Code = data.ResultList[0][key]
              images.eq(4).attr('src', base64Code)
            }
          }
        })
        .fail(function (err) {
          swal('', 'something was wrong', 'error')
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
            if (keyword && key !== 'Img') {
              keyword.value = data.ResultList[0][key]
            }
            if (key === 'Img') {
              base64Code = data.ResultList[0][key]
              images.eq(5).attr('src', base64Code)
            }
          }
        })
        .fail(function (err) {
          swal('', 'something was wrong', 'error')
        })
        break
      case 4:
        var editDialog = $('#editDialog4')
        $.get('/teenlong/src/v1/house/house_beds.php', {
          Type: 0,
          Keys: '',
          Search: {
            Id: id
          }
        })
        .done(function (data) {
          data = JSON.parse(data)
          var forms = $('#target4-edit-form')
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
      case 5:
        var editDialog = $('#editDialog5')
        $.get('/teenlong/src/v1/house/infrastructure.php', {
          Type: 0,
          Keys: '',
          Search: {
            Id: id
          }
        })
        .done(function (data) {
          data = JSON.parse(data)
          var forms = $('#target5-edit-form')
          for (var key in data.ResultList[0]) {
            var keyword = forms.get(0).elements[key]
            if (keyword) {
              keyword.value = data.ResultList[0][key]
            }
            if (key === 'Code') {
              base64Code = data.ResultList[0][key]
              images.eq(7).attr('src', base64Code)
            }
          }
        })
        .fail(function (err) {
          swal('', 'something was wrong', 'error')
        })
        break
      case 6:
        var editDialog = $('#editDialog6')
        $.get('/teenlong/src/v1/house/house_infrastructures.php', {
          Type: 0,
          Keys: '',
          Search: {
            Id: id
          }
        })
        .done(function (data) {
          data = JSON.parse(data)
          var forms = $('#target6-edit-form')
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
