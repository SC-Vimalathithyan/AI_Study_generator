const express = require("express");
const router = express.Router();
const { generateNotes } = require("../controllers/aiController");

router.post("/generate", generateNotes);

module.exports = router;