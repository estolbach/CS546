const express = require("express");
const router = express.Router();


let about = {
    "name": "Esther Stolbach",
    "cwid": "10422386",
    "biography": "My name is Esther Stolbach and I am currently completeing my last semester as an undergrad at Stevens Institute of Technology. I am the youngest of seven kids in my family. All of my siblings are married and I have 20 neices and nephews./n I love adventure and travel. I was fortunate enough to study abroad in Sydney, Australia. I have been to 15 countries and over 20 states in the US.",
    "favoriteShows": ["The Office", "Friends", "Marvelous Mrs. Maisel"],
    "hobbies": ["Hiking", "Snowboarding", "Yoga", "Reading"]
}


router.get("/", async (req, res) => {
  try {
    res.json(about);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;