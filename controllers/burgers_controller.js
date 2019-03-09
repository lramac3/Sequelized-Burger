const express = require("express");

const router = express.Router();

// Import the model to use its database functions.
let burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.

//root route, show each burger's information, calls model's .all()
router.get("/", function (req, res) {
    burger.all(function (data) {
        let hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        //render index.handlebars
        res.render("index", hbsObject);
    });
});

//when post request comes from client, calls model's create()
router.post("/api/burgers", function (req, res) {
    burger.create([
        "name"
    ], [
            req.body.name
        ], function (result) {
            // Send back the ID of the new quote
            res.json({ id: result.insertId });
        });
});

//when put request comes from client, calls model's update()
router.put("/api/burgers/:id", function (req, res) {
    let condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        ate: req.body.ate,
        liked: req.body.liked
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//when delete request comes from client, calls model's delete()
router.delete("/api/burgers/:id", function (req, res) {

    burger.delete(
        { id: req.params.id },
        function (result) {
            if (result.affectedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
});


// Export routes for server.js to use.
module.exports = router;