const { Router } = require("express");
const router = Router();
const bookingsController = require("../../controllers/bookings.controller")
const authHackController = require("../../controllers/authhack.controller")
const userHackController = require("../../controllers/userhack.controller")

router
  .get("/bookings", bookingsController.getBookings)
  .post("/bookings/create",bookingsController.createBooking)
  .post("/login", authHackController.login)
  .get("/active-session",userHackController.getActiveUser)

module.exports = router;