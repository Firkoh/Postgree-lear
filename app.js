import express from 'express';
import pool from './db.js';
import path from 'path'; 
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const port = 5000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));
app.use(express.static(path.join(__dirname, 'ejs'))); // Serve static files

app.get('/', async (req, res) => {
        const results = await pool.query('select * from Country'); 
        res.render('indexi.ejs', { data: results.rows }); 
});

// app.get('/edit.ejs',(req,res)=>{res.render('
//         res.render('edit.ejs'{});
// ')}); 


app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
