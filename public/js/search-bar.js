$(document).ready(function() {
    $(".field .blink").click(function() {
        $(".field .blink").val("");
    });
    $(document).on("click", function(e) {
        if(!$(e.target).closest(".field .blink").length) {
            $(".field .blink").val("SEARCH");
        };
    });


});