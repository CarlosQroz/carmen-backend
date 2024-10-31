import { pool } from "../db.js";

export const getProducts = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM products");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM products WHERE id_product = ?", [
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Products table not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Missing id parameter" });
        }


        const [rows] = await pool.query("DELETE FROM products WHERE id_product = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};


export const createProduct = async (req, res) => {
    try {
        const { name, description } = req.body;
        const [rows] = await pool.query(
            "INSERT INTO products (name, description) VALUES (?, ?)",
            [name, description]
        );
        res.status(201).json({ id: rows.insertId, name, description });
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const [result] = await pool.query(
            "UPDATE products SET name = IFNULL(?, name), description = IFNULL(?, description) WHERE id_product = ?",
            [name, description, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Products not found" });

        const [rows] = await pool.query("SELECT * FROM products WHERE id_product = ?", [
            id,
        ]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

