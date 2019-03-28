// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  app.get("/", function(req, res) {
    db.burger.findAll({
      include: [{ model: db.User, attributes: ["username"] }],
      order: [[db.User, "username", "ASC"], ["name"]],
    }).then(function(data) {
      var hbsObject = {
        burgers: data,
      };
      db.User.findAll({}).then(function(data2) {
        hbsObject["users"] = data2;
        res.render("index", hbsObject);
      });
    });
  });

  //root route, show each burger's information, calls model's .all()
  app.get("/burgers/:userid", function(req, res) {
    db.burger.findAll({
      where: {
        UserId: req.params.userid,
      },
      include: [{ model: db.User }],
      order: [["name", "ASC"]],
    }).then(function(data) {
      var hbsObject = {
        burgers: data,
      };
      db.User.findAll({}).then(function(data2) {
        hbsObject["users"] = data2;
        res.json(hbsObject);
      });
    });
  });

  //when post request comes from client, calls model's create()
  app.post("/api/burgers", function(req, res) {
    db.burger.create({
      name: req.body.name,
      UserId: req.body.userId,
    }).then(function(data) {
      res.json({ id: data.insertId });
    });
  });

  //when post request comes from client, calls model's create()
  app.post("/api/users", function(req, res) {
    db.User.create({
      username: req.body.username,
    }).then(function(data) {
      res.json({ id: data.insertId });
    });
  });

  //when put request comes from client, calls model's update()
  app.put("/api/burgers/:id", function(req, res) {
    db.burger.update(
      {
        visited: req.body.visited,
        liked: req.body.liked,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then(function(data) {
      if (data.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

  //when delete request comes from client, calls model's delete()
  app.delete("/api/burgers/:id", function(req, res) {
    db.burger.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function(data) {
      if (data.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
};
