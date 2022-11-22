$(document).ready(function() {
    let id;
    (async() => id = await login(getData))();

    $("#top .shell #header #navigation ul li.account").click(function() {
        if (id) {
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
    $(".signUpWindow .action button.cancelbtn").click(function() {
        $(".signUpWindow").hide();
        $(".signUpWindow .signUpForm input").val('');
    });

});

async function getData() {
    const res = await fetch("http://localhost:3000/account", {
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