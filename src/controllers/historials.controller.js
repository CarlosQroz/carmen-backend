// Importa la conexión a la base de datos
import { pool } from "../db.js";

// Función para actualizar el stock y registrar en el historial
export const updateStock = async (req, res) => {
    try {
        const { id } = req.params; // Id del stock
        const { detalles } = req.body; // Detalles de la actualización

        // Obtener la información del stock actual
        const [stockInfo] = await pool.query(
            "SELECT * FROM stock WHERE id_stock = ?",
            [id]
        );

        if (stockInfo.length === 0) {
            return res.status(404).json({ message: 'Stock not found' });
        }

        // Actualizar el stock en la base de datos
        const [result] = await pool.query(
            "UPDATE stock SET stock = stock + ? WHERE id_stock = ?",
            [addstock, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Stock not found' });
        }

        // Obtener información adicional del producto
        const [variantInfo] = await pool.query(
            "SELECT v.talla, v.precio, v.color, p.nombre AS producto, s.nombre AS sede_name FROM variantes_producto v JOIN productos p ON v.id_producto = p.id_producto JOIN sedes s ON p.id_sede = s.id_sede WHERE v.id_variante = ?",
            [stockInfo[0].id_variante]
        );

        // Insertar entrada en el historial de stock
        await pool.query(
            "INSERT INTO historial_stock (id_stock, sede_name, producto, talla, precio, color, detalles) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [id, variantInfo[0].sede_name, variantInfo[0].producto, variantInfo[0].talla, variantInfo[0].precio, variantInfo[0].color, detalles]
        );

        // Respuesta con el nuevo stock actualizado
        res.json({ id_stock: id, stock: stockInfo[0].stock });
    } catch (error) {
        console.error('Error al actualizar el stock:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
