$(document).ready(function() {
    $("#top .shell #header #navigation ul li.account").click(function() {
        $(".loginWindow").show();
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