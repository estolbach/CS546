const express = require("express");
const router = express.Router();

let story = {
    "storyTitle": "Writers Block",
    "story": "Once upon a time there was a girl doing her computer science homework. She had to write a story as part of the hw and that was harder for her than the actual assigment. See, this girl wasn't a very good writer and she had writers block. /nThe end."
}

router.get("/", async (req, res) => {
  try {
    res.json(story);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;