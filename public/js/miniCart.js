var i = 0;
var total = 0;
$(document).ready(function() {
    $(".right .cart .cart-ico").click(function(){
        $(".miniCart").show();
    });
    checkEmpty();
    $(".cart button.cartCloser").click(function() {
        $(".miniCart").hide();
    });
    $(".buyingWindow .details .confirmButton button:nth-child("+ 1 +")").click(function() {
        var brandName = $(".buyingWindow .details .description").find("span").eq(0).text();
        var itemNumber = $(".buyingWindow .details .description").find("span").eq(1).text();
        var price = $(".buyingWindow .details .description").find("span").eq(2).text();
        price = Number(price);
        total += price;
        $(".miniCart .cart ul").append('<li><p>'+ brandName +'</p> <button type="button">X</button> <p class="price"><span>'+price+'</span> USD</p> </li>');
        i++;
        checkEmpty();
        updatePrice();
        $(".buyingWindow").hide();
    });
    $(".miniCart .cart ul").on("click", "li button", function() {
        $(this).closest('li').remove();
        var price = Number($(this).siblings("p.price").find("span").text());
        total -=price;
        i--;
        checkEmpty();
        updatePrice();
    });

});

function checkEmpty() {
    if(i===0) $(".cart .cartFooter").html('<p class="empty">You are poor</P>');
    else $(".cart .cartFooter").html('<p>Total: <span>'+total+'</span> USD</p> <button class="checkOut">Check Out</button>');
}

function updatePrice() {
    $(".right .cart strong.price").text(''+total+' USD');
}