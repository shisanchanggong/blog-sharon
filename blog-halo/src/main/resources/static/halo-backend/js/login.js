var halo = new $.halo();
$(document).ready(function () {
    $("#login-name").val(localStorage.getItem("loginName"));
});

function btn_login() {
    $('#btn-login').button('loading');
    var name = $("#login-name").val();
    var pwd = $("#login-pwd").val();
    if (name == "" || pwd == "") {
        halo.showMsg("请输入完整信息！", 'info', 2000);
        $('#btn-login').button('reset');
    } else {
        $.ajax({
            type: 'POST',
            url: '/admin/getLogin',
            async: false,
            data: {
                'loginName': name,
                'loginPwd': pwd
            },
            success: function (data) {
                localStorage.setItem('loginName', $("#login-name").val());
                if (data.code == 1) {
                    halo.showMsgAndRedirect(data.msg, 'success', 1000, '/admin');
                } else {
                    $('.login-body').addClass('animate shake');
                    $.toast({
                        text: data.msg,
                        heading: heading,
                        icon: 'error',
                        showHideTransition: 'fade',
                        allowToastClose: true,
                        hideAfter: 2000,
                        stack: 1,
                        position: 'top-center',
                        textAlign: 'left',
                        loader: true,
                        loaderBg: '#ffffff',
                        afterHidden: function () {
                            $('.login-body').removeClass('animate shake');
                        }
                    });
                    $('#btn-login').button('reset');
                }
            }
        });
    }
}

$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        btn_login();
    }
});
