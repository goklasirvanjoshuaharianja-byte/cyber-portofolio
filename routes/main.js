// REFERENSI — jangan langsung timpa routes/main.js kamu yang sekarang.
// Gabungkan bagian ini ke route kamu yang sudah ada (misalnya kalau kamu
// pakai express-ejs-layouts, view engine, dsb yang sudah diatur di server.js).

const express = require('express');
const router = express.Router();

// Edit array ini untuk nambah / ubah project. Cukup edit di sini,
// tidak perlu sentuh file .ejs lagi.
const projects = [
  {
    name: 'cyber-portofolio',
    desc: 'Portofolio pribadi bertema cyber security, dibangun untuk showcase project dan skill.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    status: 'active', // active | learning | coursework
    repo: 'https://github.com/goklasirvanjoshuaharianja-byte/cyber-portofolio',
    live: null, // isi URL kalau sudah live, atau biarkan null
  },
  {
    name: 'SKM-New',
    desc: 'Website pertemanan yang bertujuan untuk mencari kemakmuran',
    tags: ['Node.js'],
    status: 'learning',
    repo: 'https://github.com/goklasirvanjoshuaharianja-byte/SKM-New',
    live: null,
  },
  {
    name: 'Pelari-Kalcer-REVV',
    desc: 'Web santai untuk belajar Javascript',
    tags: ['JavaScript'],
    status: 'learning',
    repo: 'https://github.com/goklasirvanjoshuaharianja-byte/Pelari-Kalcer-REVV',
    live: null,
  },
  {
    name: 'Web-TugasASD1',
    desc: 'Tugas kuliah — struktur data & algoritma, diimplementasikan dalam bentuk web.',
    tags: ['HTML', 'CSS'],
    status: 'coursework',
    repo: 'https://github.com/goklasirvanjoshuaharianja-byte/Web-TugasASD1-GoklasIrvanJoshuaHarianja',
    live: null,
  },
];

router.get('/', (req, res) => {
  res.render('index', { title: 'Joshua | Cyber Security Portfolio', activePage: 'home' });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About | Joshua', activePage: 'about' });
});

router.get('/projects', (req, res) => {
  res.render('projects', { title: 'Projects | Joshua', activePage: 'projects', projects });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact | Joshua', activePage: 'contact' });
});

module.exports = router;
