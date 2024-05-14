import { pool } from "../db.js";

export const getProductos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM productos");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const getProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM productos WHERE id_producto = ?", [
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Productos table not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};


export const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Missing id parameter" });
        }


        const [rows] = await pool.query("DELETE FROM productos WHERE id_producto = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Producto not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};


export const createProducto = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const [rows] = await pool.query(
            "INSERT INTO productos (nombre, descripcion) VALUES (?, ?)",
            [nombre, descripcion]
        );
        res.status(201).json({ id: rows.insertId, nombre, descripcion });
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};


export const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        const [result] = await pool.query(
            "UPDATE productos SET nombre = IFNULL(?, nombre), descripcion = IFNULL(?, descripcion) WHERE id_producto = ?",
            [nombre, descripcion, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Productos not found" });

        const [rows] = await pool.query("SELECT * FROM productos WHERE id_producto = ?", [
            id,
        ]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

