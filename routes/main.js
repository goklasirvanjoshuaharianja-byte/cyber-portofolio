const express = require("express");
const router = express.Router();
const axios = require("axios");
const nodemailer = require("nodemailer");

// ambil dari .env
require("dotenv").config();

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
CONTACT (GET)
====================== */
router.get("/contact", (req, res) => {
  res.render("contact", {
    success: req.query.success
  });
});

/* ======================
CONTACT (POST) 🔥
====================== */
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // kirim email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `📩 Portfolio Message - ${name}`,
      html: `
        <div style="font-family:sans-serif;">
          <h2 style="color:#00ffff;">📩 New Message</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b></p>
          <p>${message}</p>
        </div>
      `
    });

    res.redirect("/contact?success=true");

  } catch (err) {
    console.log(err);
    res.redirect("/contact?success=false");
  }
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
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    res.render("projects", { repos });

  } catch (err) {
    console.log(err);
    res.render("projects", { repos: [] });
  }
});

module.exports = router;