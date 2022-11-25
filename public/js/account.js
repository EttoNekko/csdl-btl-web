$(document).ready(function() {
    let id;
    (async() => id = await login(getData))();

    $("#top .shell #header #navigation ul li.account").click(function() {
        if (id) {
            $(".logOutWindow").show();
            return;
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
    $(".logOutWindow .logOutPlace .action button.logOut").click(function() {

    });
    $(".signUpWindow .action button.cancelbtn").click(function() {
        $(".signUpWindow").hide();
        $(".signUpWindow .signUpForm input").val('');
    });

});

async function getData() {
    const res = await fetch("/account", {
        method: 'GET'
    });
    const data = await res.json();
    return data;
}

async function login(getData) {
    const data = await getData();
    if(data) {
        $("#account").text(data.username);
        return data.id;
    }
}