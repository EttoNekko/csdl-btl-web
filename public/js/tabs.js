$(document).ready(function() {
    $(".tabs ul li").click(function() {
        $(this).siblings().children("a").removeClass("active");
        $(this).children("a").addClass("active");
        const i = $(this).index() + 1;
        $("#container .tabbed .tab-content:nth-child("+ i +")").siblings().hide();
        $("#container .tabbed .tab-content:nth-child("+ i +")").fadeIn();
    });

    $(".tab-content .items li").each(function() {
        const id = $(this).find("span.id").text();
        getShoes(id)
        .then((data) => {
            const brandName = data[0].brand;
            const shoeName = data[0].name;
            const edition = data[0].edition;
            const price = data[0].price;
            $(this).find(".info").html("Brand name: <span>" + brandName + "</span><br />Shoe name: <span>" + shoeName + "</span><br />Edition: <span>" + edition + "</span>");
            $(this).find(".price").html("Wholesale Price: <strong>" + price + "</strong> <strong>USD</strong>");
            const t = this;
            $(this).find(".image a img").attr("src", "css/images/" + id + ".png");

            $(data).each(function() {
                $(t).find(".color").append("<span>" + this.color + "</span>");
            });
        })
    });

});

async function getShoes(id) {
    const res = await fetch('/tabs', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id": id
      })
    });
    const data = await res.json();
    return data;
  }