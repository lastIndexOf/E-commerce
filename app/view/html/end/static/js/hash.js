;(function () {

  var DOMs = (function() {
    var liTargets = $('.li-target')
    var forms = $('.target-form')
    var childBox = forms.find('.childbox')
    var adminUser = $('#adminUsrName')
    var signOut = $('#singOut')

    return {
      liTargets: liTargets,
      forms: forms,
      childBox: childBox,
      adminUser: adminUser,
      signOut: signOut
    }
  })()

  window.DOMs = DOMs
  eventHandle()

  function eventHandle() {
    // highlight controler
    DOMs.liTargets
      .on('click', function (e) {
        DOMs.liTargets.removeClass('active')

        $(this).addClass('active')
      })

    // allSelector controler
    DOMs.forms
      .delegate('[name=allSelect]', 'change', function (e) {
        var isSelect = e.target.checked

        if (!isSelect) {
          DOMs.forms
            .find('.childbox')
            .each(function (i, v) {
              v.checked = false
            })
        }
        else {
          DOMs.forms
            .find('.childbox')
            .each(function (i, v) {
              v.checked = true
            })
        }
      })

    // sign out
    DOMs.signOut
      .click(function (e) {
        $.ajax({
          type: 'DELETE',
          url: '/teenlong/src/v1/operation/login.php'
        })
        .done(function (data) {
          if (data.status === 204) {
            window.location.href = '/teenlong/webContent/end/login.html'
          }
        })
        .fail(function (err) {
          swal('', 'something was wrong', 'error')
        })
      })
  }
})()

window.onload = function () {
  location.hash = '#target1'
}
