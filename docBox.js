$(".header").click(function () {
    $('.tag').slideToggle(500, function () {
        $('header').text(function () {
            return $('tag').is(":visible") ? "Collapse Source Documentation" : "Expand Source Documentation";
        });
    });
});