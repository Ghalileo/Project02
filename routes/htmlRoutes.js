var db = require("../models");


const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load Home page
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
