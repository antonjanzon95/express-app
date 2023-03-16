var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  req.app.locals.db
    .collection("users")
    .find()
    .toArray()
    .then((results) => {
      console.log(results);

      let printUsers = "<div><h2>Våra users</h2>";

      for (user in results) {
        printUsers += `<div>${results[user].name}</div>`;
      }

      printUsers += "</div>";

      res.send(printUsers);
    });
});

router.post("/add", function (req, res, next) {
  const newUser = req.body;

  req.app.locals.db
    .collection("users")
    .insertOne(newUser)
    .then((result) => {
      console.log("resultat från db: ", result);
      res.json(result);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
