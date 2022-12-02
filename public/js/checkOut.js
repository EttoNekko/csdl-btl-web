$(document).ready(function() {
    const shoesData = sessionStorage.getItem('shoesData');
    (async() => {
      const data = await getShoes(shoesData);
      $(data).each(function() {
        //cho quantity trang trc vao day
        const quantity ='<div class="quantity"> <div class="minus"></div> <div class="value">1</div> <div class="plus"></div></div>';
        $('.checkOutArea .products table tbody').append('<tr> <td><span>'+ 
        this.name + '</span></td> <td>'+quantity+'</td> <td>' +
        'Brand: ' + this.brand + '</br>Shoes type: ' + this.type + '</br>Color: ' + this.color + '</br>Size: ' + this.size + ' US</td> <td>$<span class="price">' + 
        this.price + '</span></td> <td class="remove"> <p>X</p> </td> </tr>');
      });
      updatePrice();
      return data;
    })()
    .then((data) => {
      $('.checkOutArea .products table tbody tr').each(function(index) {
        const tr = this;
        $(tr).find('.remove p').click(function() {
          $(tr).remove();
          data.splice(index, 1);
          updatePrice();
        })
      })
      $('.products table tbody td div.quantity .minus').click(function() {
        let num = Number($(this).siblings('div.value').eq(0).text());
        if(num!==1) {
          let price = Number($(this).parents('tr').eq(0).find('span.price').text());
          price = price - price/num;
          $(this).parents('tr').eq(0).find('span.price').text(''+price+'');
          num-=1;
          $(this).siblings('div.value').eq(0).text(''+ num +'');
          updatePrice();
        };
      });
      $('.products table tbody td div.quantity .plus').click(function() {
        let num = Number($(this).siblings('div.value').eq(0).text());
        let price = Number($(this).parents('tr').eq(0).find('span.price').text());
        price = price + price/num;
        $(this).parents('tr').eq(0).find('span.price').text(''+price+'');
        num+=1;
        $(this).siblings('div.value').eq(0).text(''+ num +'');
        updatePrice();
      });
    });

    getInfo();
});

function updatePrice() {
  let total = 0;
  $('.checkOutArea .products tbody tr td').children('span.price').each(function() {
    const price = Number($(this).text());
    total += price;
  });
  $('.checkOutArea .confirmDetail .total span').text(''+total+'');
}

async function getShoes(shoesData) {
  const res = await fetch('/shoes', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: shoesData
  });
  const data = await res.json();
  console.log(data);
  return data;
}

async function getInfo() {
  const res = await fetch('/accountInfo', {
    method: 'GET'
  });
  const data = await res.json();
  console.log(data);
  $('#name').text('Name: ' + data.name);
  $('#phone').text('Phone Number: ' + data.phoneNumber);
  $('#address').text('Address: ' + data.address);
}
