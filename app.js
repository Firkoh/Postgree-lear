import express from 'express';
import path from 'path';
import pool from './database.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000; 


app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('belajar', path.join(__dirname, 'belajar'));
app.use(express.static(path.join(__dirname))); 

app.get('/', async (req, res,next) => {
    try {
        const results = await pool.query('SELECT * FROM country ORDER BY ID ASC');  
        res.render('index', { data: results.rows }); 
    } catch (err) {
      next(err);
    }
});

app.get('/edit/:id', async (req, res,next) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query('SELECT * FROM country WHERE id = $1', [id]);
        res.render('edit', { data: result.rows[0], errors: {} });
 } catch (error) {
        next(error); 
    }
});

app.post('/update/:id', async (req, res) => {
try{
    const id = parseInt(req.params.id);
    const { country, capital } = req.body;

    const errors = {};
    if (!country) {
        errors.country = 'Negara harus diisi.';
    }
    if (!capital) {
        errors.capital = 'Ibukota harus diisi.';
    }

    if (Object.keys(errors).length > 0) {
            const result = await pool.query('SELECT * FROM country WHERE id =$1', [id]);
            const originalData = result.rows[0];
            res.render('edit', { data: originalData, errors });
    } else {
        try {
            await pool.query('UPDATE country SET country = $1, capital = $2 WHERE id = $3', [country, capital,id]);
            res.redirect('/');
        } catch (error) {
            console.error("Error updating data:", error.stack);
            
            // Penanganan error yang lebih spesifik
            if (error.code === '23505') { // Contoh error unique constraint violation
                errors.country = 'Negara sudah ada.';
            } else {
                errors.general = 'Terjadi kesalahan saat memperbarui data.';
            }
            res.render('edit', { data: req.body, errors }); // Kirim kembali input pengguna dan errors
        }
    }
}
catch(error){
next(error);
}
});


app.get('/hapus/:id', async (req, res,next) => {
    try {
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM country WHERE id = $1', [id]);
        res.redirect('/');
    } catch (error) {
         next(error);
    }
});
// tidak perlu menaruh setiap menu catch di atas, bisa langgsung dibuatkan
// ini Error jangan duplikat
app.use((error, req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} - ${error.message}`);
    if (error.status === 404) {
        res.status(404).render('error404', { errorMessages: error.message });
    }  else {
        res.status(500).render('error500', { errorMessages: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
