const router = require("express").Router();
const db = require("../../models");
const authLockedRoute = require("./authLockedRoute");

// Create a new Trip
router.post("/", authLockedRoute, async (req, res) => {
  try {
    // get the signed in account
    const user = res.locals.user;
    const newTrip = await db.Trip.create(req.body);
    user.trips.push(newTrip);
    await user.save();
    await newTrip.save();
    const response = newTrip;
  } catch (err) {
    console.warn(err);
    res.status(500).json({ msg: "server error" });
  }
});

// Get all trips

router.get("/", authLockedRoute, async (req, res) => {
  try {
    const user = res.locals.user;
    const trips = await db.Trip.find({
      user: user._id,
    });
    res.json(trips);
  } catch (err) {
    console.warn(err);
    res.status(500).json({
      msg: "server error",
    });
  }
});

// Edit a trip
router.put("/:id", authLockedRoute, async (req, res) => {
  try {
    const id = req.params.id;
    const options = { new: true };
    // The trip is searched for.
    const trip = await db.Trip.findByIdAndUpdate(id, req.body, options);
    res.json(trip);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ msg: "server error" });
  }
});

// Delete a trip
router.delete("/:id", authLockedRoute, async (req, res) => {
  try {
    const id = req.params.id;
    await db.Trip.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
