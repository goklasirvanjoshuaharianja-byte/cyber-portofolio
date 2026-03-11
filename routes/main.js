const express = require("express");
const router = express.Router();
const axios = require("axios");

const GITHUB_USERNAME = "goklasirvanjoshuaharianja-byte";

/* ======================
HOME
====================== */
router.get("/", (req, res) => {
res.render("index");
});

/* ======================
ABOUT
====================== */
router.get("/about", (req, res) => {
res.render("about");
});

/* ======================
CONTACT
====================== */
router.get("/contact", (req, res) => {
res.render("contact");
});

/* ======================
PROJECTS (GitHub API)
====================== */
router.get("/projects", async (req, res) => {

try {

const response = await axios.get(
`https://api.github.com/users/${GITHUB_USERNAME}/repos`
);

const repos = response.data
.filter(repo => !repo.fork)
.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at));

res.render("projects",{ repos });

} catch(err){

console.log(err);

res.render("projects",{ repos: [] });

}

});

module.exports = router;
