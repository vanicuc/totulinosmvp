var express = require("express");
var router = express.Router();
const db = require("../model/helper");
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

//GETs all trips
router.get("/trips", userShouldBeLoggedIn, function (req, res, next) {
  db("SELECT * FROM trips;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

//GET trip depending from id
router.get("/trips/:id", userShouldBeLoggedIn, function (req, res, next) {
  const { id } = req.params;
  db(`SELECT * FROM trips WHERE id=${id} ;`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

//INSERT a new trip into trip_type and returns the id
router.post("/trips/new/:user_id", async function (req, res, next) {
  const{ user_id } = req.params;
  const { name } = req.body;
  //  const { users_id } = req.params; ${users_id}}
  try {
    //select from trips - order by id descending-limit results to 1
    await db(`INSERT INTO trips (name, user_id) VALUES ( "${name}", ${user_id} );`);
    const result = await db("SELECT id FROM trips ORDER BY id DESC LIMIT 1");
    //grab trip id - send to client as an object
    res
      .status(201)
      .send({ trip_id: result.data[0].id, msg: "Trip added successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});

/* GET intervals  */
router.get("/intervals", function (req, res, next) {
  db(`SELECT * FROM intervals;`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

//INSERT a new interval depending on trip_id
router.post("/trips/:trip_id/intervals", async function (req, res, next) {
  const { interval_longitude, interval_latitude } = req.body;
  const { trip_id } = req.params;
  try {
    await db(
      `INSERT INTO intervals (trip_id, interval_longitude, interval_latitude, interval_time) VALUES (${trip_id}, "${interval_longitude}", "${interval_latitude}", NOW())`
    );
    const results = await db(
      `SELECT * FROM intervals WHERE trip_id=${trip_id};`
    );
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Delete a trip- doesnt fully work
router.delete("/trips/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    await db(`DELETE FROM intervals WHERE trip_id = ${id} ;`);
    await db(`DELETE FROM trips WHERE id = ${id} ;`);
    res.send("Trip successfully deleted!");
  } catch (err) {
    res.status(500).send(err);
  }
});



//INSERT a new interval depending on trip_id
router.get("/trips/:user_id", async function (req, res, next) {
  const { interval_longitude, interval_latitude } = req.body;
  const { user_id } = req.params;
  try {
    await db(
      `INSERT INTO intervals (trip_id, interval_longitude, interval_latitude, interval_time) VALUES (${trip_id}, "${interval_longitude}", "${interval_latitude}", NOW())`
    );
    const results = await db(
      `SELECT * FROM intervals trips WHERE user_id=${user_id};`
    );
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
