const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Garante que a pasta 'uploads' existe
const pastaUploads = path.join(__dirname, 'uploads');
if (!fs.existsSync(pastaUploads)) {
    fs.mkdirSync(pastaUploads);
}

// Configura onde e com que nome os ficheiros serão guardados
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Adiciona a data atual ao nome para evitar ficheiros repetidos
        const nomeUnico = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
        cb(null, nomeUnico);
    }
});

const upload = multer({ storage: storage });

// Permite aceder aos ficheiros do site e da pasta uploads
app.use(express.static(__dirname));
app.use('/uploads', express.static(pastaUploads));

// Rota que recebe o ficheiro do portfólio
app.post('/fazer-upload', upload.single('arquivo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ erro: 'Nenhum ficheiro foi enviado.' });
    }
    
    // Devolve o caminho público do ficheiro guardado na pasta uploads
    res.json({
        sucesso: true,
        url: `/uploads/${req.file.filename}`,
        nomeOriginal: req.file.originalname
    });
});

app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
});