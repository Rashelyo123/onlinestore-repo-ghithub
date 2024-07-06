const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path'); // Import module path

const app = express();
const port = 3000;

// Middleware untuk memproses body berformat JSON
app.use(bodyParser.json());

// Konfigurasi koneksi MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin', // Ganti dengan password MySQL Anda
    database: 'commentsDB'
});

// Koneksi ke MySQL
db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Route untuk menangani POST data komentar
app.post('/comments', (req, res) => {
    const { name, email, message } = req.body;
    const query = 'INSERT INTO comments (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err, result) => {
        if (err) {
            res.status(500).send('Error inserting comment');
        } else {
            res.status(200).send('Komentar Anda berhasil disimpan'); // Pesan berhasil disimpan
        }
    });
});

// Route untuk menangani GET data komentar
app.get('/comments', (req, res) => {
    const query = 'SELECT * FROM comments ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching comments');
        } else {
            res.json(results);
        }
    });
});

app.use('/', express.static(path.join(__dirname)));

// Menyajikan file CSS dari folder 'css'
app.use('/css', express.static(path.join(__dirname, 'css')));

// Menyajikan file JavaScript dari folder 'js'
app.use('/js', express.static(path.join(__dirname, 'js')));

// Menyajikan file gambar dari folder 'ImageBanner', 'ImageMenu', 'ImagePayment', 'ImageSlider'
app.use('/ImageBanner', express.static(path.join(__dirname, 'ImageBanner')));
app.use('/ImageMenu', express.static(path.join(__dirname, 'ImageMenu')));
app.use('/ImagePayment', express.static(path.join(__dirname, 'ImagePayment')));
app.use('/ImageSlider', express.static(path.join(__dirname, 'ImageSlider')));

// Menyajikan file statis dari folder 'index'
app.use(express.static(path.join(__dirname, 'index')));

// Handler untuk route root ('/')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index', 'index.html'));
});

// Menjalankan server di port 3000
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
