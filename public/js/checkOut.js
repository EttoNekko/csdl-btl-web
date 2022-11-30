$(document).ready(function() {
    const shoesData = sessionStorage.getItem('shoesData');
    (async() => {
      const data = await getShoes(shoesData);
      $(data).each(function() {
        $('.checkOutArea .products table tbody').append('<tr> <td><span>'+ 
        this.name + '</span></td> <td>a</td> <td>' +
        'Brand: ' + this.brand + '</br>Shoes type: ' + this.type + '</br>Color: ' + this.color + '</br>Size: ' + this.size + ' US</td> <td>$' + 
        this.price + '</td> <td class="remove"> <p>X</p> </td> </tr>');
      });
      return data;
    })()
    .then((data) => {
    $('.checkOutArea .products table tbody tr').each(function(index) {
      const tr = this;
      $(tr).find('.remove').click(function() {
        $(tr).remove();
        data.splice(index, 1);
      })
    })
    
    });

    getInfo();
});

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