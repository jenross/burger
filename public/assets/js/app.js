$(function() {
    $(".devour").on("click", function(e) {
        let id =$(this).data("id");
        let devourNow = $(this).data("devournow");

        let newDevouredState = {
            devoured: devourNow
        };

    $.ajax("/api/burgers" + id, {
        type: "PUT", 
        data: newDevouredState
    }).then (
        function() {
            location.reload();
        }
    );
});

    $(".create-burger").on("submit", function(event) {
        event.preventDefault(); 

        let newBurger = {
            burger_name: $("#addburger").val().trim(), 
            devoured: 0
        };

        $.ajax("/api/burgers", {
            type: "POST", 
            data: newBurger
        }).then(
            function() {
                location.reload();
                $("#addburger").empty();
            }
        );
    });
});