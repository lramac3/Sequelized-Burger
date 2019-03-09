// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {

    //on click of like button send a PUT request
    $(".liked").on("click", function (event) {
        let id = $(this).data("id");

        //create object with new values
        let newBurgerState = {
            ate: true,
            liked: true
        };

        // Send the PUT request with id in query parameter and values in request body
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newBurgerState
        }).then(
            function () {
                location.reload();
            }
        );
    });

    //on click of dislike button send a PUT request
    $(".disliked").on("click", function (event) {
        let id = $(this).data("id");

        //create object with new values
        let newBurgerState = {
            ate: true,
            liked: false
        };

        // Send the PUT request with id in query parameter and values in request body
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newBurgerState
        }).then(
            function () {
                location.reload();
            }
        );
    });

    //on click of delete button send a DELETE request
    $(".delburger").on("click", function () {
        let id = $(this).data("id");

        // Send the DELETE request with id in query parameter
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function () {
                location.reload();
            }
        );
    });

    //on click of Add burger button send a POST request
    $("#submit-burger").on("click", function (event) {
        event.preventDefault();

        //get name of the burger from textbox
        let name = $("#burger-name").val().trim();

        // Send the POST request with values in request body
        $.ajax("/api/burgers", {
            type: "POST",
            data: { name: name }
        }).then(
            function () {
                location.reload();
            });
    });
});