$(document).ready(function() {
    if(sessionStorage.getItem('value')) {
    let value = sessionStorage.getItem('value');
    $('.checkOutArea .products table tbody td:nth-child('+1+') span').html(value);
    };
});