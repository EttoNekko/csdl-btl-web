$(document).ready(function() {
    $(".tab-content .items ul").children("li").click(function() {
        //take data from the shoes user click on and assign them to buy window
        const imgSrc = $(this).find("img").attr("src");
        $(".buyingWindow .details img").attr("src", imgSrc);
        const brandName = $(this).find("p").eq(0).find("span").eq(0).text();
        const shoeName = $(this).find("p").eq(0).find("span").eq(1).text();
        const edition = $(this).find("p").eq(0).find("span").eq(2).text();
        const price = $(this).find("p.price").find("strong").eq(0).text();
        $(".buyingWindow .details .description").find("span").eq(0).text(brandName);
        $(".buyingWindow .details .description").find("span").eq(1).text(shoeName);
        $(".buyingWindow .details .description").find("span").eq(2).text(edition);
        $(".buyingWindow .details .description").find("span").eq(3).text(price);
        const id = $(this).find("div.data").children("span.id").text();
        $(".buyingWindow div.data span.id").text(id);
        //set color choosing option
        $(".buyingWindow .details .description ul.colorChoose").children().remove();
        $(this).find("div.color").eq(0).children("span").each(function() {
            const color = $(this).text();
            $(".buyingWindow .details .description ul.colorChoose").append('<li>'+ color +'</li>');
        });
        $(".buyingWindow .details .description ul li:nth-child("+ 1 +")").addClass("choosen").siblings().removeClass("choosen");
        $(".buyingWindow").show();
    })

    $(".buyingWindow .details .confirmButton button:nth-child("+ 2 +")").click(function() {
        $(".buyingWindow").hide();
    })
    //change style of option being chose
    $(".buyingWindow .details .description ul").on("click", "li", function() {
        $(this).addClass("choosen");
        $(this).siblings().removeClass("choosen");
    });

});