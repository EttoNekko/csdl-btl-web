let i = 0;
let total = 0;
$(document).ready(function() {
    $(".right .cart .cart-ico").click(function(){
        $(".miniCart").show();
    });
    checkEmpty();
    $(".cart button.cartCloser").click(function() {
        $(".miniCart").hide();
    });
    $(".buyingWindow .details .confirmButton button:nth-child("+ 1 +")").click(function() {
        const brandName = $(".buyingWindow .details .description").find("span").eq(0).text();
        const itemNumber = $(".buyingWindow .details .description").find("span").eq(1).text();
        let price = $(".buyingWindow .details .description").find("span").eq(2).text();
        price = Number(price);
        total += price;
        $(".miniCart .cart ul").append('<li><p>'+ brandName +'</p> <div class="itemRemover"><p>X</p></div> <p class="price"><span>'+price+'</span> USD</p> </li>');
        i++;
        checkEmpty();
        updatePrice();
        $(".buyingWindow").hide();
    });
    $(".miniCart .cart ul").on("click", "li div", function() {
        $(this).closest('li').remove();
        const price = Number($(this).siblings("p.price").find("span").text());
        total -=price;
        i--;
        checkEmpty();
        updatePrice();
    });

});

function checkEmpty() {
    if(i===0) {
        $(".cart .cartFooter").html('<p class="empty">You are poor</P>');
        $(".miniCart .cart ul").hide();
    }
    else {
        $(".cart .cartFooter").html('<p>Total: <span>'+total+'</span> USD</p> <a class="checkOut" href="checkOut.html">Check Out</a>');
        $(".miniCart .cart ul").show();
    };
}

function updatePrice() {
    $(".right .cart strong.price").text(''+total+' USD');
}