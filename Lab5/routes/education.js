const express = require("express");
const router = express.Router();


let education =
    [
        {
            "schoolName": "Rockland Community College",
            "degree": "Associates in Computer information Systems",
            "favoriteClass": "Calculus",
            "favoriteMemory": "Being President of the FOI club"
        },

        {
            "schoolName": "Stevens Institute of Tehnology",
            "degree": "B.S. in Computer Science",
            "favoriteClass": "CS 385",
            "favoriteMemory": "Meeting my friends"
        },

        {
            "schoolName": "UNSW",
            "degree": "Study abroad",
            "favoriteClass": "Env. Activism",
            "favoriteMemory": "Hard to pick because the whole expereince was amazing."
        }
    ]


router.get("/", async (req, res) => {
  try {
    res.json(education);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;