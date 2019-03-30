// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  var userid;
  $("#add-user").hide();
  if ($("#user-ddl").val() == "0") {
    $("#liked-burgers").hide();
    $("#disliked-burgers").hide();
    $("#add-burger").hide();
  }

  function getAllburgers(data) {
    $("#unvisited-burgers").empty();
    $("#unvisited-burgers").append(`<h2>Wanna Try</h2>`);
    for (var i = 0; i < data.burgers.length; i++) {
      if (!data.burgers[i].visited) {
        $("#unvisited-burgers").append(
          `<br><div class="burger-each unvisited">
                <button class="btn liked" data-id=` +
            data.burgers[i].id +
            `><i class="fa fa-thumbs-up"></i></button>` +
            data.burgers[i].name +
            `<button class="btn disliked" data-id=` +
            data.burgers[i].id +
            `><i class="fa fa-thumbs-down"></i></button>
                </div>`
        );
      }
    }

    $("#liked-burgers").empty();
    $("#liked-burgers").append(`<h1><i class="fa fa-thumbs-up"></i></h1>`);
    for (var i = 0; i < data.burgers.length; i++) {
      if (data.burgers[i].visited && data.burgers[i].liked) {
        $("#liked-burgers").append(
          `<br>
                <div class="burger-each">` +
            data.burgers[i].name +
            `<button class="btn delburger" data-id=` +
            data.burgers[i].id +
            `><i class="fa fa-trash"></i></button>
                </div>`
        );
      }
    }

    $("#disliked-burgers").empty();
    $("#disliked-burgers").append(
      `<h1><i class="fa fa-thumbs-down"></i></h1>`
    );
    for (var i = 0; i < data.burgers.length; i++) {
      if (data.burgers[i].visited && !data.burgers[i].liked) {
        $("#disliked-burgers").append(
          `<br>
                <div class="burger-each">` +
            data.burgers[i].name +
            `<button class="btn delburger" data-id=` +
            data.burgers[i].id +
            `><i class="fa fa-trash"></i></button>
                </div>`
        );
      }
    }
  }
  $("#add-user-link").on("click", function() {
    $("#add-user").show();
    $("#liked-burgers").hide();
    $("#disliked-burgers").hide();
    $("#unvisited-burgers").hide();
    $("#add-burger").hide();
    $("#user-ddl").val("0");
  });

  $("#user-ddl").on("change", function() {
    userid = $("#user-ddl").val();
    if (userid != "0") {
      $.get("/burgers/" + userid, function(data) {
        $("#liked-burgers").show();
        $("#disliked-burgers").show();
        $("#add-burger").show();
        $("#unvisited-burgers").show();
        $("#add-user").hide();
        getAllburgers(data);
      });
    } else {
      $("#liked-burgers").hide();
      $("#disliked-burgers").hide();
      $("#add-burger").hide();
      window.location.href = "/";
    }
  });

  //on click of like button send a PUT request
  $(document).on("click", ".liked", function(event) {
    var id = $(this).data("id");

    //create object with new values
    var newburgerState = {
      visited: true,
      liked: true,
    };

    // Send the PUT request with id in query parameter and values in request body
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newburgerState,
    }).then(function() {
      $.get("/burgers/" + userid, function(data) {
        console.log(data);
        $("#liked-burgers").show();
        $("#disliked-burgers").show();
        getAllburgers(data);
      });
    });
  });

  //on click of dislike button send a PUT request
  $(document).on("click", ".disliked", function(event) {
    var id = $(this).data("id");

    //create object with new values
    var newburgerState = {
      visited: true,
      liked: false,
    };

    // Send the PUT request with id in query parameter and values in request body
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newburgerState,
    }).then(function() {
      $.get("/burgers/" + userid, function(data) {
        console.log(data);
        $("#liked-burgers").show();
        $("#disliked-burgers").show();
        getAllburgers(data);
      });
    });
  });

  //on click of delete button send a DELETE request
  $(document).on("click", ".delburger", function() {
    var id = $(this).data("id");

    // Send the DELETE request with id in query parameter
    $.ajax("/api/burgers/" + id, {
      type: "DELETE",
    }).then(function() {
      $.get("/burgers/" + userid, function(data) {
        console.log(data);
        $("#liked-burgers").show();
        $("#disliked-burgers").show();
        getAllburgers(data);
      });
    });
  });

  //on click of Add restuarant button send a POST request
  $("#submit-burger").on("click", function(event) {
    event.preventDefault();

    var user = $("#user-ddl").val();
    var name = $("#burger-name")
      .val()
      .trim();
    $("#burger-name").val("");

    if (name !== "") {
      // Send the POST request with values in request body
      $.ajax("/api/burgers", {
        type: "POST",
        data: { name: name, userId: user },
      }).then(function() {
        $.get("/burgers/" + userid, function(data) {
          console.log(data);
          $("#liked-burgers").show();
          $("#disliked-burgers").show();
          getAllburgers(data);
        });
      });
    }
  });

  $("#submit-user").on("click", function(event) {
    event.preventDefault();

    var user = $("#user-name")
      .val()
      .trim();
    $("#user-name").val("");

    if (user !== "") {
      // Send the POST request with values in request body
      $.ajax("/api/users", {
        type: "POST",
        data: { username: user },
      }).then(function() {
        location.reload();
      });
    }
  });
});
