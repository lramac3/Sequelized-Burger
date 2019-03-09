// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

let burger = {
    all: function (cb) {
        //calls orm's .selectAll()
        orm.selectAll("burgers", function (res) {
            cb(res);
        });
    },

    // The variables cols and vals are arrays.
    //calls orm's .insertOne()
    create: function (cols, vals, cb) {
        orm.insertOne("burgers", cols, vals, function (res) {
            cb(res);
        });
    },

    //calls orm's .updateOne()
    update: function (objColVals, condition, cb) {
        orm.updateOne("burgers", objColVals, condition, function (res) {
            cb(res);
        });
    },

    //calls orm's .deleteOne()
    delete: function (objColVals, cb) {
        orm.deleteOne("burgers", objColVals, function (res) {
            cb(res);
        });
    }
};

// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;