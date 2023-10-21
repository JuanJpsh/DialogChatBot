const { Router } = require("express");
const router = Router();
const demoChatController = require("../../controllers/demo-chat.controller");

router
  .get("/question", demoChatController.askQuestion)

module.exports = router;