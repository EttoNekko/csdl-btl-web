let i = 0;
//so san pham trong gio hang
let total = 0;
$(document).ready(function() {
    $(".right .cart .cart-ico").click(function(){
        $(".miniCart").show();
    });
    checkEmpty();
    $(".cart button.cartCloser").click(function() {
        $(".miniCart").hide();
    });
    //create new li for minicart and change the price being show
    $(".buyingWindow .details .confirmButton button:nth-child("+ 1 +")").click(function() {
        const shoeName = $(".buyingWindow .details .description").find("span").eq(1).text();
        let price = $(".buyingWindow .details .description p.price").find("span").eq(0).text();
        price = Number(price);
        total += price;
        const quantity = '<div class="quantity"><p></p></div>';
        const data = '<div class="data" style="display:none"><span class="id"></span><span class="color"></span><span class="size"></span></div>';
        $(".miniCart .cart ul").append('<li><p>'+ shoeName +'</p> '+quantity+' <div class="itemRemover"><p>X</p></div> <p class="price"><span>'+price+'</span> USD</p> '+data+' </li>');
        const id = $(".buyingWindow div.data span.id").text();
        const color = $(".buyingWindow .details .description ul.colorChoose li.choosen").text();
        const size = $(".buyingWindow .details .description ul.sizeChoose li.choosen").text().substr(0, 2);
        const num = $(".buyingWindow .details .description div.quantity div.value").text();
        i++;
        $(".miniCart .cart ul li:nth-child("+i+") div.data span.id").text(id);
        $(".miniCart .cart ul li:nth-child("+i+") div.data span.color").text(color);
        $(".miniCart .cart ul li:nth-child("+i+") div.data span.size").text(size);
        $(".miniCart .cart ul li:nth-child("+i+") div.quantity p").text(num);
        checkEmpty();
        updatePrice();
        $(".buyingWindow").hide();
    });
    //allow only number in input
    $(".miniCart .cart ul").on("input", "li div.quantity input.numeric", function() {
        this.value = this.value.replace(/\D/g,'');
    });
    //change price when quantity change
    $(".miniCart .cart ul").on('focusin', 'li div.quantity input', function(){
        $(this).data('val', $(this).val());
    }).on('change','input', function(){
        var prev = $(this).data('val');
        var current = $(this).val();
        let price = Number($(this).parents('li').eq(0).find('p.price span').first().text());
        total-=price;
        if(current<=0) {
            $(this).parents('li').eq(0).remove();
            i--;
        } else {
            price = price/prev *current;
            $(this).parents('li').eq(0).find('p.price span').first().text(price);
            total+=price;
        }
        checkEmpty();
        updatePrice();
    });
    //remove item from cart
    $(".miniCart .cart ul").on("click", "li div.itemRemover", function() {
        $(this).closest('li').remove();
        const price = Number($(this).siblings("p.price").find("span").text());
        total -=price;
        i--;
        checkEmpty();
        updatePrice();
    });
    //save data using session storage
    $("a.checkOut").click(function(e) {
        if(i!=0) {
            transferId();
        } else {
            e.preventDefault();
            alert('No give us money?');
        }
    });
    $(".cart .cartFooter").click(function() {
        if(i!=0) {
            transferId();
        } else {
            e.preventDefault();
            alert('No give us money?');
        }
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
//luu id vao tung bien tang dan trong session storage
function transferId() {
    const shoesData = [];
    $(".miniCart .cart ul").children('li').each(function() {
        const id = $(this).find('span.id').text();
        const color = $(this).find('span.color').text();
        const size = $(this).find('span.size').text();
        //them quantity
        const quantity = +$(this).find('div.quantity p').text();
        const data = { 
            "id": id,
            "color": color,
            "size": size,
            "quantity": quantity
        };
        shoesData.push(data);
    });
    sessionStorage.setItem("shoesData", JSON.stringify(shoesData));
}