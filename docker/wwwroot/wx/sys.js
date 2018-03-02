var seconds = 60; var intervalId; var btnObj;
function DoLogin(action) {
    btnObj = document.getElementById('btn_vcode');
    var telephone = document.getElementById('login_mobile').value;
    var vcode = document.getElementById('login_vcode').value;
    if (!telephone) {
        wln.alert('请输入手机号');
    } else if (!vcode && action == 'login') {
        wln.alert('请输入验证码');
    } else {
        if (action == 'sendpwd') {
            btnObj.setAttribute("disabled", "disabled");
            btnObj.value = "正在发送，请稍候...";
        }
        wln.get('/app/login/' + action, { 'mobile': telephone, 'vcode': vcode }, function (json) {
            if (json.success) {
                if (action == 'sendpwd') {
                    btnObj.setAttribute("disabled", "disabled");
                    btnObj.style.backgroundColor = "#999999";
                    btnObj.value = "验证码发送成功";
                    intervalId = setInterval(function () {
                        seconds--;
                        if (seconds > 0) {
                            btnObj.value = seconds + "秒后可重新获取";
                        } else {
                            clearInterval(intervalId);
                            btnObj.removeAttribute("disabled");
                            btnObj.style.backgroundColor = "#2FB0C2";
                            btnObj.value = "获取验证码";
                            seconds = 60;
                            btnObj = null;
                        }
                    }, 1000);
                } else if (action == 'login') {
                    history.replaceState(null, '', '/');
                    self.location.reload();
                }
            } else if (json.message) {
                if (action == 'sendpwd') {
                    btnObj.removeAttribute("disabled");
                    btnObj.style.backgroundColor = "#2FB0C2";
                    btnObj.value = "获取验证码";
                } else if (action == 'login') {
                }
                wln.alert(json.message);
            }
        });
    }
}