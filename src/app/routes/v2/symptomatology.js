const { Router } = require("express");
const router = Router();
const symptomatologyController = require("../../controllers/symptomatology.controller");

router
  .post("/", symptomatologyController.getDiagnosis)

module.exports = router;