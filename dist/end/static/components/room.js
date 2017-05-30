var removeId
var removeType
var editId
var editType
;(function () {
  var page1 = 1
  var page2 = 1
  var page3 = 1
  // var page4 = 1
  // var page5 = 1
  // var page6 = 1
  var pageBtn1 = true
  var pageBtn2 = true
  var pageBtn3 = true
  // var pageBtn4 = true
  // var pageBtn5 = true
  // var pageBtn6 = true

  var Btns1 = $('.target1-btns')
  var Btns2 = $('.target2-btns')
  var Btns3 = $('.target3-btns')
  // var Btns4 = $('.target4-btns')
  // var Btns5 = $('.target5-btns')
  // var Btns6 = $('.target6-btns')
  var floorAdd1 = $('#addNewFloor1')
  var floorAdd2 = $('#addNewFloor2')
  var floorAdd3 = $('#addNewFloor3')
  // var floorAdd4 = $('#addNewFloor4')
  // var floorAdd5 = $('#addNewFloor5')
  // var floorAdd6 = $('#addNewFloor6')
  var floorEdit1 = $('#editOldFloor1')
  var floorEdit2 = $('#editOldFloor2')
  var floorEdit3 = $('#editOldFloor3')
  // var floorEdit4 = $('#editOldFloor4')
  // var floorEdit5 = $('#editOldFloor5')
  // var floorEdit6 = $('#editOldFloor6')
  var allRemove1 = $('#target1-mul-remove')
  var allRemove2 = $('#target2-mul-remove')
  var allRemove3 = $('#target3-mul-remove')
  // var allRemove4 = $('#target4-mul-remove')
  // var allRemove5 = $('#target5-mul-remove')
  // var allRemove6 = $('#target6-mul-remove')

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
    // Btns4.delegate('.btn', 'click', function (e) {
    //   if (!pageBtn4) return
    //   pageBtn4 = false
    //   var nextPage = $(this).text() - 0 || 1
    //   page4 = nextPage
    //   ajaxToDate(4)

    // })
    // Btns5.delegate('.btn', 'click', function (e) {
    //   if (!pageBtn5) return
    //   pageBtn5 = false
    //   var nextPage = $(this).text() - 0 || 1
    //   pag53 = nextPage
    //   ajaxToDate(5)

    // })
    // Btns6.delegate('.btn', 'click', function (e) {
    //   if (!pageBtn6) return
    //   pageBtn6 = false
    //   var nextPage = $(this).text() - 0 || 1
    //   page6 = nextPage
    //   ajaxToDate(6)

    // })

    imgFileInput.on('change', function (e) {
      reader.onload = function () {
        base64Code = reader.result
        imgFileInput.parent().next().attr('src', base64Code)
      }
      reader.readAsDataURL(this.files[0])
    })

    floorAdd1.click(function(e) {
      var addForm = $('#target1-add-form')
      var form = addForm.get(0).elements
      
      var checkboxs = []
      for (var i = 0, len = form.type.length; i < len; i++) {
        if (form.type[i].checked === true) {
          checkboxs.push(form.type[i].value)
        }
      }
      $.ajax({
        type: 'PUT',
        url: '/v1/api/vedio/vedio',
        data: {
          author: form.author.value,
          title: form.title.value,
          avatar: base64Code,
          money: form.money.value,
          type: checkboxs,
          summary: form.summary.value,
          promotion: form.promotion.value,
          diffculty: form.diffculty.value
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
    floorAdd2.click(function(e) {
      var addForm = $('#target2-add-form')
      var form = addForm.get(0).elements
      $.ajax({
        type: 'PUT',
        url: '/v1/api/vedio/child',
        data: {
          parent: form.parent.value,
          title: form.title.value,
          time: form.time.value,
          src: form.src.value
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
    floorAdd3.click(function(e) {
      var addForm = $('#target3-add-form')
      var form = addForm.get(0).elements
      $.ajax({
        type: 'PUT',
        url: '/v1/api/type/type',
        data: {
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

    $('#targetPut1').click(function(e) {
      if ($(this).text() === '上线') {
        swal({
          text: '您确定要发布该视频吗',
          showCancelButton: true,
          showLoaderOnConfirm: true,
          preConfirm() {
            return new Promise(function(resolve, reject) {
              $.post('/v1/api/vedio/vedios', {
                id: editId,
                update: {
                  isthrough: true
                } 
              })
              .done(function(data) {
                $('#target1-edit-form')
                  .closest('.modal-body')
                  .siblings('.modal-footer')
                  .find('#target1-edit-close')
                  .click()
                resolve()
              })
              .fail(function(err) {
                reject()
              })
            })
          },
          type: 'warning'
        }).then(function() {
          swal('', '上线成功', 'success')
        }).catch(function() {
          swal('', '发生未知错误', 'error')
        })
      } else {
        swal({
          text: '您确定要下架该视频吗',
          showCancelButton: true,
          showLoaderOnConfirm: true,
          preConfirm() {
            return new Promise(function(resolve, reject) {
              $.post('/v1/api/vedio/vedios', {
                id: editId,
                update: {
                  isthrough: false
                } 
              })
              .done(function(data) {
                $('#target1-edit-form')
                  .closest('.modal-body')
                  .siblings('.modal-footer')
                  .find('#target1-edit-close')
                  .click()
                resolve()
              })
              .fail(function(err) {
                reject()
              })
            })
          },
          type: 'error'
        }).then(function() {
            swal('', '下架成功成功', 'success')
          }).catch(function() {
            swal('', '发生未知错误', 'error')
          })
      }
    })

    // floorAdd4.click(function (e) {
    //   var addForm = $('#target4-add-form')
    //   var form = addForm.get(0).elements
    //   $.ajax({
    //     type: 'POST',
    //     url: '/teenlong/src/v1/house/house_beds.php',
    //     data: {
    //       HouseId: form.HouseId.value,
    //       Width: form.Width.value,
    //       Length: form.Length.value,
    //       Name: form.Name.value,
    //       Number: form.Number.value
    //     }
    //   })
    //   .done(function (data) {
    //     addForm
    //       .closest('.modal-body')
    //       .siblings('.modal-footer')
    //       .find('#target4-add-close')
    //       .click()

    //     swal({text: '操作成功', timer: 1000})
    //     ajaxToDate(4)
    //     _initSelectKeys()
    //   })
    //   .fail(function (err) {
    //     swal('', 'something was wrong', 'error')
    //   })

    // })
    // floorAdd5.click(function (e) {
    //   var addForm = $('#target5-add-form')
    //   var form = addForm.get(0).elements
    //   $.ajax({
    //     type: 'POST',
    //     url: '/teenlong/src/v1/house/infrastructure.php',
    //     data: {
    //       Name: form.Name.value,
    //       Code: form.Code.value
    //     }
    //   })
    //   .done(function (data) {
    //     addForm
    //       .closest('.modal-body')
    //       .siblings('.modal-footer')
    //       .find('#target5-add-close')
    //       .click()

    //     swal({text: '操作成功', timer: 1000})
    //     ajaxToDate(5)
    //     _initSelectKeys()
    //   })
    //   .fail(function (err) {
    //     swal('', 'something was wrong', 'error')
    //   })

    // })
    // floorAdd6.click(function (e) {
    //   var addForm = $('#target6-add-form')
    //   var form = addForm.get(0).elements
    //   $.ajax({
    //     type: 'POST',
    //     url: '/teenlong/src/v1/house/house_infrastructures.php',
    //     data: {
    //       HouseId: form.HouseId.value,
    //       InfrastructureId: form.InfrastructureId.value
    //     }
    //   })
    //   .done(function (data) {
    //     addForm
    //       .closest('.modal-body')
    //       .siblings('.modal-footer')
    //       .find('#target6-add-close')
    //       .click()

    //     swal({text: '操作成功', timer: 1000})
    //     ajaxToDate(6)
    //     _initSelectKeys()
    //   })
    //   .fail(function (err) {
    //     swal('', 'something was wrong', 'error')
    //   })

    // })

    floorEdit1.click(function (e) {
      var editForm = $('#target1-edit-form')
      var form = editForm.get(0).elements
      
      var checkboxs = []
      for (var i = 0, len = form.type.length; i < len; i++) {
        if (form.type[i].checked === true) {
          checkboxs.push(form.type[i].value)
        }
      }
      $.ajax({
        type: 'POST',
        url: '/v1/api/vedio/vedios',
        data: {
          id: editId,
          update: {
            title: form.title.value,
            avatar: base64Code,
            money: form.money.value,
            type: checkboxs,
            summary: form.summary.value,
            promotion: form.promotion.value,
            diffculty: form.diffculty.value
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
        type: 'POST',
        url: '/v1/api/vedio/children',
        data: {
          id: editId,
          update: {
            title: form.title.value,
            src: form.src.value,
            time: form.time.value
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
        type: 'POST',
        url: '/v1/api/type/types',
        data: {
          id: editId,
          update: {
            name: form.name.value
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
    // floorEdit4.click(function (e) {
    //   var editForm = $('#target4-edit-form')
    //   var form = editForm.get(0).elements
    //   $.ajax({
    //     type: 'PUT',
    //     url: '/teenlong/src/v1/house/house_beds.php',
    //     data: {
    //       Type: 0,
    //       Id: editId,
    //       Update: {
    //         HouseId: form.HouseId.value,
    //         Width: form.Width.value,
    //         Length: form.Length.value,
    //         Name: form.Name.value,
    //         Number: form.Number.value
    //       }
    //     }
    //   })
    //   .done(function (data) {
    //     ajaxToDate(4)
    //     editForm
    //       .closest('.modal-body')
    //       .siblings('.modal-footer')
    //       .find('#target4-edit-close')
    //       .click()

    //     swal({text: '操作成功', timer: 1000})

    //   })
    //   .fail(function (err) {
    //     swal('', 'something was wrong', 'error')

    //   })
    // })
    // floorEdit5.click(function (e) {
    //   var editForm = $('#target5-edit-form')
    //   var form = editForm.get(0).elements
    //   $.ajax({
    //     type: 'PUT',
    //     url: '/teenlong/src/v1/house/infrastructure.php',
    //     data: {
    //       Type: 0,
    //       Id: editId,
    //       Update: {
    //         Name: form.Name.value,
    //         Code: form.Code.value
    //       }
    //     }
    //   })
    //   .done(function (data) {
    //     ajaxToDate(5)
    //     editForm
    //       .closest('.modal-body')
    //       .siblings('.modal-footer')
    //       .find('#target5-edit-close')
    //       .click()

    //     swal({text: '操作成功', timer: 1000})

    //   })
    //   fail(function (err) {
    //     swal('', 'something was wrong', 'error')
    //   })
    // })
    // floorEdit6.click(function (e) {
    //   var editForm = $('#target6-edit-form')
    //   var form = editForm.get(0).elements
    //   $.ajax({
    //     type: 'PUT',
    //     url: '/teenlong/src/v1/house/house_infrastructures.php',
    //     data: {
    //       Type: 0,
    //       Id: editId,
    //       Update: {
    //         HouseId: form.HouseId.value,
    //         InfrastructureId: form.InfrastructureId.value
    //       }
    //     }
    //   })
    //   .done(function (data) {
    //     ajaxToDate(6)
    //     editForm
    //       .closest('.modal-body')
    //       .siblings('.modal-footer')
    //       .find('#target6-edit-close')
    //       .click()

    //     swal({text: '操作成功', timer: 1000})

    //   })
    //   .fail(function (err) {
    //     swal('', 'something was wrong', 'error')

    //   })
    // })

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
    // allRemove4.on('click', function(e) {
    //   var ids = []
    //   DOMs.forms
    //     .eq(3)
    //     .find('.childbox')
    //     .each(function (i, v) {
    //       if (v.checked === true) {
    //         ids.push(v.value)
    //       }
    //     })
    //   removeId = ids.join('+')
    //   removeType = 4
    //   removeOne()
    // })
    // allRemove5.on('click', function(e) {
    //   var ids = []
    //   DOMs.forms
    //     .eq(4)
    //     .find('.childbox')
    //     .each(function (i, v) {
    //       if (v.checked === true) {
    //         ids.push(v.value)
    //       }
    //     })
    //   removeId = ids.join('+')
    //   removeType = 5
    //   removeOne()
    // })
    // allRemove6.on('click', function(e) {
    //   var ids = []
    //   DOMs.forms
    //     .eq(5)
    //     .find('.childbox')
    //     .each(function (i, v) {
    //       if (v.checked === true) {
    //         ids.push(v.value)
    //       }
    //     })
    //   removeId = ids.join('+')
    //   removeType = 6
    //   removeOne()
    // })
  }

  function ajaxToDate(type) {
    switch (type) {
      case 1:
        $.get('/v1/api/vedio/vedios', {
          keys: '_id+title+author+diffculty+money+isthrough',
          page: page1,
          limit: 10,
          populate: true
       })
        .done(function (data) {
          data.LEN = 6
          data.type = type
          data.ResultList.forEach(function(item) {
            item.author = item.author.name
          })
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
        $.get('/v1/api/vedio/children', {
          keys: '_id+parent+title+src',
          page: page2,
          limit: 10,
          populate: true
        })
        .done(function (data) {
          data.LEN = 4
          data.type = type
          data.ResultList.forEach(function (item) {
            item.parent = item.parent.title
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
        $.get('/v1/api/type/types', {
          keys: '_id+name',
          page: page3,
          limit: 10
        })
        .done(function (data) {
          data.LEN = 2
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
      // case 4:
      //   $.get('/teenlong/src/v1/house/house_beds.php', {
      //     Type: 0,
      //     Keys: 'Id+HouseId+Width+Length+Name+Number',
      //     Page: page4,
      //     PageSize: 10,
      //     Search: {
      //       Id: ''
      //     }
      //   })
      //   .done(function (data) {
      //     data = JSON.parse(data)
      //     data.LEN = 6
      //     data.type = type
      //     // data.ResultList.map(function (item) {
      //     //   delete item.Citys
      //     // })
      //     var tpl = $('#target1-table-template').html()
      //     var tmp = ejs.render(tpl, data)
      //     $('#target4-body').html(tmp)
      //     pageBtn4 = true
      //     changePageBtns(Btns4, 4, data.Total)
      //   })
      //   .fail(function (err) {
      //     swal('', 'something was wrong', 'error')
      //     pageBtn4 = true
      //   })
      //   break
      // case 5:
      //   $.get('/teenlong/src/v1/house/infrastructure.php', {
      //     Type: 0,
      //     Keys: 'Id+Name+Code',
      //     Page: page5,
      //     PageSize: 10,
      //     Search: {
      //       Id: ''
      //     }
      //   })
      //   .done(function (data) {
      //     data = JSON.parse(data)
      //     data.LEN = 3
      //     data.type = type
      //     // data.ResultList.map(function (item) {
      //     //   delete item.Citys
      //     // })
      //     var tpl = $('#target1-table-template').html()
      //     var tmp = ejs.render(tpl, data)
      //     $('#target5-body').html(tmp)
      //     pageBtn5 = true
      //     changePageBtns(Btns5, 5, data.Total)
      //   })
      //   .fail(function (err) {
      //     swal('', 'something was wrong', 'error')
      //     pageBtn5 = true
      //   })
      //   break
      // case 6:
        // $.get('/teenlong/src/v1/house/house_infrastructures.php', {
        //   Type: 0,
        //   Keys: 'Id+HouseId+InfrastructureId+Code+Name',
        //   Page: page6,
        //   PageSize: 10,
        //   Search: {
        //     Id: ''
        //   }
        // })
        // .done(function (data) {
        //   data = JSON.parse(data)
        //   data.LEN = 5
        //   data.type = type
        //   // data.ResultList.map(function (item) {
        //   //   delete item.Citys
        //   // })
        //   var tpl = $('#target1-table-template').html()
        //   var tmp = ejs.render(tpl, data)
        //   $('#target6-body').html(tmp)
        //   pageBtn6 = true
        //   changePageBtns(Btns6, 6, data.Total)
        // })
        // .fail(function (err) {
        //   swal('', 'something was wrong', 'error')
        //   pageBtn3 = true
        // })
        // break
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
      case 3:
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
              page3 === pages 
                ? page3 
                : page3 === 1 
                  ? page3 + 2 
                  : page3 + 1)
            .end().eq(2).text(
              page3 === pages 
                ? page3 - 1 
                : page3 === 1 
                  ? page3 + 1 
                  : page3)
            .end().eq(1).text(
              page3 === pages 
                ? page3 - 2 
                : page3 === 1 
                  ? page3 
                  : page3 - 1)
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
          Btns.find('.btn').hide()
            .eq(1).show().text(1)
            .end().eq(2).show().text(2)
            .end().eq(3).show().text(3)
        }
        else {
          Btns.find('.btn').show()
            .eq(3).text(
              page4 === pages 
                ? page4 
                : page4 === 1 
                  ? page4 + 2 
                  : page4 + 1)
            .end().eq(2).text(
              page4 === pages 
                ? page4 - 1 
                : page4 === 1 
                  ? page4 + 1 
                  : page4)
            .end().eq(1).text(
              page4 === pages 
                ? page4 - 2 
                : page4 === 1 
                  ? page4 
                  : page4 - 1)
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
          Btns.find('.btn').hide()
            .eq(1).show().text(1)
            .end().eq(2).show().text(2)
            .end().eq(3).show().text(3)
        }
        else {
          Btns.find('.btn').show()
            .eq(3).text(
              page5 === pages 
                ? page5 
                : page5 === 1 
                  ? page5 + 2 
                  : page5 + 1)
            .end().eq(2).text(
              page5 === pages 
                ? page5 - 1 
                : page5 === 1 
                  ? page5 + 1 
                  : page5)
            .end().eq(1).text(
              page5 === pages 
                ? page5 - 2 
                : page5 === 1 
                  ? page5 
                  : page5 - 1)  
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
          url: '/v1/api/vedio/vedios',
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
          url: '/v1/api/vedio/children',
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
          url: '/v1/api/type/types',
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
      // case 4:
      //   $.ajax({
      //     url: '/teenlong/src/v1/house/house_beds.php',
      //     type: 'DELETE',
      //     data: {
      //       Type: 0,
      //       Search: {
      //         Id: removeId
      //       }
      //     }
      //   })
      //   .done(function (data) {
      //     ajaxToDate(4)
      //     $('#noneDisplayremove').click()
      //     swal({text: '操作成功', timer: 1000})
      //     removeId = ''
      //     removeType = ''
      //     _initSelectKeys()
      //   })
      //   .fail(function (err) {
      //     $('#noneDisplayremove').click()
      //     swal('', 'something was wrong', 'error')
      //   })
      //   break
      // case 5:
      //   $.ajax({
      //     url: '/teenlong/src/v1/house/infrastructure.php',
      //     type: 'DELETE',
      //     data: {
      //       Type: 0,
      //       Search: {
      //         Id: removeId
      //       }
      //     }
      //   })
      //   .done(function (data) {
      //     ajaxToDate(5)
      //     $('#noneDisplayremove').click()
      //     swal({text: '操作成功', timer: 1000})
      //     removeId = ''
      //     removeType = ''
      //     _initSelectKeys()
      //   })
      //   .fail(function (err) {
      //     $('#noneDisplayremove').click()
      //     swal('', 'something was wrong', 'error')
      //   })
      //   break
      // case 6:
        // $.ajax({
        //   url: '/teenlong/src/v1/house/house_infrastructures.php',
        //   type: 'DELETE',
        //   data: {
        //     Type: 0,
        //     Search: {
        //       Id: removeId
        //     }
        //   }
        // })
        // .done(function (data) {
        //   ajaxToDate(6)
        //   $('#noneDisplayremove').click()
        //   swal({text: '操作成功', timer: 1000})
        //   removeId = ''
        //   removeType = ''
        //   _initSelectKeys()
        // })
        // .fail(function (err) {
        //   $('#noneDisplayremove').click()
        //   swal('', 'something was wrong', 'error')
        // })
        // break
    }
  }

  function _initSelectKeys() {
    // add one
    $.get('/v1/api/user/masters', {
      keys: '_id+name',
      limit: 99999,
      page: 1
    })
    .done(function (data) {
      var tmp = [
        '<% for (var i = 0, len = ResultList.length; i < len; i++) { %>',
        '<option value="<%= ResultList[i]._id %>"><%= ResultList[i].name %></option>',
        '<% } %>'
      ].join('')
      var tpl = ejs.render(tmp, data)
      $('[name="author"]')
        .html(tpl)
    })

    // add two
    $.get('/v1/api/type/types', {
      keys: '_id+name',
      limit: 99999,
      page: 1
    })
    .done(function (data) {
      var tmp = [
        '<% for (var i = 0, len = ResultList.length; i < len; i++) { %>',
        '<label class="checkbox-inline">',
        '<input type="checkbox" name="type" value="<%= ResultList[i]._id %>"><%= ResultList[i].name %>',
        '</label>',
        '<% } %>'
      ].join('')
      var tpl = ejs.render(tmp, data)
      $('.type-wrapper')
        .html(tpl)
    })

    // add three
    $.get('/v1/api/vedio/vedios', {
      keys: '_id+title',
      limit: 99999,
      page: 1
    })
    .done(function (data) {
      var tmp = [
        '<% for (var i = 0, len = ResultList.length; i < len; i++) { %>',
        '<option value="<%= ResultList[i]._id %>"><%= ResultList[i].title %></option>',
        '<% } %>'
      ].join('')
      var tpl = ejs.render(tmp, data)
      $('[name="parent"]')
        .html(tpl)
    })

    // $.get('/teenlong/src/v1/house/purpose.php', {
    //   Type: 0,
    //   Keys: 'Id+Name',
    //   Search: {
    //     Id: ''
    //   }
    // })
    // .done(function (data) {
    //   data = JSON.parse(data)
    //   var tmp = [
    //     '<% for (var i = 0, len = ResultList.length; i < len; i++) { %>',
    //     '<option value="<%= ResultList[i].Id %>"><%= ResultList[i].Name %></option>',
    //     '<% } %>'
    //   ].join('')
    //   var tpl = ejs.render(tmp, data)
    //   $('[name="PurposeId"]')
    //   .html(tpl)
    // })

    // $.get('/teenlong/src/v1/place/district.php', {
    //   Type: 0,
    //   Keys: 'Id+Name',
    //   Search: {
    //     Id: ''
    //   }
    // })
    // .done(function (data) {
    //   data = JSON.parse(data)
    //   var tmp = [
    //     '<% for (var i = 0, len = ResultList.length; i < len; i++) { %>',
    //     '<option value="<%= ResultList[i].Id %>"><%= ResultList[i].Name %></option>',
    //     '<% } %>'
    //   ].join('')
    //   var tpl = ejs.render(tmp, data)
    //   $('[name="DistrictId"]')
    //   .html(tpl)
    // })

    // // add four
    // $.get('/teenlong/src/v1/house/house.php', {
    //   Type: 0,
    //   Keys: 'Id+Title',
    //   Search: {
    //     Id: ''
    //   }
    // })
    // .done(function (data) {
    //   data = JSON.parse(data)
    //   var tmp = [
    //     '<% for (var i = 0, len = ResultList.length; i < len; i++) { %>',
    //     '<option value="<%= ResultList[i].Id %>"><%= ResultList[i].Title %></option>',
    //     '<% } %>'
    //   ].join('')
    //   var tpl = ejs.render(tmp, data)
    //   $('[name="HouseId"]')
    //   .html(tpl)
    // })

    // // add five
    // $.get('/teenlong/src/v1/house/infrastructure.php', {
    //   Type: 0,
    //   Keys: 'Id+Name',
    //   Search: {
    //     Id: ''
    //   }
    // })
    // .done(function (data) {
    //   data = JSON.parse(data)
    //   var tmp = [
    //     '<% for (var i = 0, len = ResultList.length; i < len; i++) { %>',
    //     '<option value="<%= ResultList[i].Id %>"><%= ResultList[i].Name %></option>',
    //     '<% } %>'
    //   ].join('')
    //   var tpl = ejs.render(tmp, data)
    //   $('[name="InfrastructureId"]')
    //   .html(tpl)
    // })

  }

  function editDate(type, id) {
    switch(type) {
      case 1:
        var editDialog = $('#editDialog1')
        $.get('/v1/api/vedio/vedio/' + id)
          .done(function (data) {
            var forms = $('#target1-edit-form')
            for (var key in data.ResultList[0]) {
              var keyword = forms.get(0).elements[key]
              if (keyword && key !== 'avatar') {
                keyword.value = data.ResultList[0][key]
              }
              if (key === 'avatar') {
                base64Code = data.ResultList[0][key]
                images.eq(1).attr('src', base64Code)
              }
              if (key === 'isthrough') {
                if (data.ResultList[0][key] === true)
                  $('#targetPut1').text('下架')
                    .removeClass('btn-info')
                    .addClass('btn-error')
                else           
                  $('#targetPut1').text('上线')
                    .removeClass('btn-error')
                    .addClass('btn-info')
              } 
              if (key === 'type') {
                keyword.forEach(function(item) {
                  data.ResultList[0][key].forEach(function(type) {
                    if (type === item.value)
                      item.checked = true
                  })
                })
              }
            }
          })
          .fail(function (err) {
            swal('', 'something was wrong', 'error')
          })
        break
      case 2:
        var editDialog = $('#editDialog2')
        $.get('/v1/api/vedio/child/' + id)
          .done(function (data) {
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
        $.get('/v1/api/type/type/' + id)
          .done(function (data) {
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
      // case 4:
      //   var editDialog = $('#editDialog4')
      //   $.get('/teenlong/src/v1/house/house_beds.php', {
      //     Type: 0,
      //     Keys: '',
      //     Search: {
      //       Id: id
      //     }
      //   })
      //   .done(function (data) {
      //     data = JSON.parse(data)
      //     var forms = $('#target4-edit-form')
      //     for (var key in data.ResultList[0]) {
      //       var keyword = forms.get(0).elements[key]
      //       if (keyword) {
      //         keyword.value = data.ResultList[0][key]
      //       }
      //     }
      //   })
      //   .fail(function (err) {
      //     swal('', 'something was wrong', 'error')
      //   })
      //   break
      // case 5:
      //   var editDialog = $('#editDialog5')
      //   $.get('/teenlong/src/v1/house/infrastructure.php', {
      //     Type: 0,
      //     Keys: '',
      //     Search: {
      //       Id: id
      //     }
      //   })
      //   .done(function (data) {
      //     data = JSON.parse(data)
      //     var forms = $('#target5-edit-form')
      //     for (var key in data.ResultList[0]) {
      //       var keyword = forms.get(0).elements[key]
      //       if (keyword) {
      //         keyword.value = data.ResultList[0][key]
      //       }
      //       if (key === 'Code') {
      //         base64Code = data.ResultList[0][key]
      //         images.eq(7).attr('src', base64Code)
      //       }
      //     }
      //   })
      //   .fail(function (err) {
      //     swal('', 'something was wrong', 'error')
      //   })
      //   break
      // case 6:
      //   var editDialog = $('#editDialog6')
      //   $.get('/teenlong/src/v1/house/house_infrastructures.php', {
      //     Type: 0,
      //     Keys: '',
      //     Search: {
      //       Id: id
      //     }
      //   })
      //   .done(function (data) {
      //     data = JSON.parse(data)
      //     var forms = $('#target6-edit-form')
      //     for (var key in data.ResultList[0]) {
      //       var keyword = forms.get(0).elements[key]
      //       if (keyword) {
      //         keyword.value = data.ResultList[0][key]
      //       }
      //     }
      //   })
      //   .fail(function (err) {
      //     swal('', 'something was wrong', 'error')
      //   })
      //   break
    }

  }

  // function animateAlert(content, timer) {
  //   var alertFrame = $('.target-alert')
  //   alertFrame.text(content)
  //   alertFrame.css({ visibility: 'visible', opacity: 1.0 })
  //   setTimeout(function() {
  //     alertFrame.css({ opacity: 0 })
  //     setTimeout(function () {
  //       alertFrame.css({  visibility: 'hidden' })
  //     }, 400)
  //   }, timer)
  // }

  window.removeOne = removeOne
  window.editDate = editDate

})()
