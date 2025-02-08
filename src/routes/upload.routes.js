import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Ruta para subir archivos
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se encontró ningún archivo' });
    }
    const imageUrl = `uploads/${req.file.filename}`;
    res.status(200).json({ message: 'Archivo subido correctamente', file: imageUrl });
});

export default router;
