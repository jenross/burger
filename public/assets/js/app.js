$(function() {
    $(".devour").on("click", function(event) {
        let id =$(this).data("id");
        let devourNow = $(this).data("devournow");

        let newDevouredState = {
            devoured: devourNow
        };

    $.ajax("/api/burgers/" + id, {
        type: "PUT", 
        data: newDevouredState
    }).then (
        function() {
            console.log("changed devoured to", newDevouredState);
            location.reload();
        }
    );
});

    $(".create-burger").on("submit", function(event) {
        event.preventDefault(); 

        let newBurger = {
            burger_name: $("#addburger").val().trim(), 
            devoured: true
        };

        $.ajax("/api/burgers", {
            type: "POST", 
            data: newBurger
        }).then(
            function() {
                console.log("created", newBurger);
                location.reload();
                // $("#addburger").empty();
            }
        );
    });
});