const { Router } = require("express");
const router = Router();
const symptomatologyController = require("../../controllers/symptomatology.controller");

router
  .get("/", symptomatologyController.getDiagnosis)

module.exports = router;