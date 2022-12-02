$(document).ready(function() {
    if (!sessionStorage.getItem('account')) {
        (async() => {
            const res = await fetch("/account", {
                method: 'GET'
            });
            const data = await res.json();
            if (data) {
                $("#account").text(data.username);
                sessionStorage.setItem('accountName', data.username);
                sessionStorage.setItem('account', data.id);
            }
        }) ();
    } else $("#account").text(sessionStorage.getItem('accountName'));

    $("#top .shell #header #navigation ul li.account").click(function() {
        if (sessionStorage.getItem('account')) {
            $(".logOutWindow").show();
        } else $(".loginWindow").show();
    });
    $(".loginWindow .action button.cancelbtn").click(function() {
        $(".loginWindow").hide();
        $(".loginWindow .loginForm input").val('');
    });
    $(".loginWindow .action .signUp").click(function() {
        $(".signUpWindow").show();
    });
    $(".logOutWindow .logOutPlace .action button.cancelbtn").click(function() {
        $(".logOutWindow").hide();
    });
    //log out button do sumthin
    $(".logOutWindow .logOutPlace .action button.logOut").click(async function() {
        sessionStorage.removeItem('account');
        await fetch("/logout", {
            method: 'GET'
        });
        location.reload();
    });
    $(".logOutWindow .logOutPlace .action button.update").click(function() {
        $(".signUpWindow").show();
        $(".signUpWindow").attr('action', '/update');
        $(".username").remove();
        $(".signUpForm input").removeAttr('required');
        $(".signupbtn").text('Update');
    });
    $(".signUpWindow .action button.cancelbtn").click(function() {
        $(".signUpWindow").hide();
        $(".signUpWindow .signUpForm input").val('');
    });

});