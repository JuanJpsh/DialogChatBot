const { Router } = require("express");
const router = Router();
const demochatController = require("../../controllers/demochat.controller");

router
  .post("/message", demochatController.getMessage)

module.exports = router;