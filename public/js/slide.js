$(document).ready(function(){
  var count = $("#slider-holder ul").children().length;
  var i = 1;
  $("#slider-nav a.prev").click(function (e) { 
    e.stopPropagation();
    $("#slider-holder ul li:nth-child(" + i + ")").fadeOut(400, function() {
        i--;
        if(i<1) i = count;
        $("#slider-holder ul li:nth-child(" + i + ")").fadeIn(400);
    })
  });
  $("#slider-nav a.next").click(function (e) { 
    e.stopPropagation();
    $("#slider-holder ul li:nth-child(" + i + ")").fadeOut(400, function() {
        i++;
        if(i>count) i = 1;
        $("#slider-holder ul li:nth-child(" + i + ")").fadeIn(400);
    })
  });

});