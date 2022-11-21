$(document).ready(function() {
    $(".tabs ul li").click(function() {
        $(this).siblings().children("a").removeClass("active");
        $(this).children("a").addClass("active");
        var i = $(this).index() + 1;
        $("#container .tabbed .tab-content:nth-child("+ i +")").siblings().hide();
        $("#container .tabbed .tab-content:nth-child("+ i +")").fadeIn();
    
    });

});