const { Router } = require("express");
const router = Router();
const authHackController = require("../../controllers/authhack.controller")
const userHackController = require("../../controllers/userhack.controller")

router
  .post("/login", authHackController.login)
  .get("/active-session",userHackController.getActiveUser)

module.exports = router;