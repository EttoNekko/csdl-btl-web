$(document).ready(function() {
    $(".tab-content .items ul").children("li").click(function() {
        var imgSrc = $(this).find("img").attr("src");
        $(".buyingWindow .details img").attr("src", imgSrc);
        var itemNumber = $(this).find("p").eq(0).find("span").eq(0).text();
        var brandName = $(this).find("p").eq(0).find("a").text();
        var price = $(this).find("p.price").find("strong").eq(0).text();
        $(".buyingWindow .details .description").find("span").eq(0).text(brandName);
        $(".buyingWindow .details .description").find("span").eq(1).text(itemNumber);
        $(".buyingWindow .details .description").find("span").eq(2).text(price);
        $(".buyingWindow .details .description ul li:nth-child("+ 1 +")").addClass("choosen").siblings().removeClass("choosen");
        $(".buyingWindow").show();
    })

    $(".buyingWindow .details .confirmButton button:nth-child("+ 2 +")").click(function() {
        $(".buyingWindow").hide();
    })

    $(".buyingWindow .details .description ul").children("li").click(function() {
        $(this).addClass("choosen");
        $(this).siblings().removeClass("choosen");
    })

});