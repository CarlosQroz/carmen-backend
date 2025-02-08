const multer = require('multer');
const path = require('path');

// Configuración de multer para almacenar los archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + file.originalname.replace(/\s/g, '_');
        cb(null, uniqueSuffix); // Nombre único para evitar sobrescritura
    },
});

const upload = multer({ storage: storage });

exports.uploadFile = (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al cargar el archivo.' });
        }
        res.status(200).json({ message: 'Archivo cargado correctamente.', file: req.file });
    });
};
