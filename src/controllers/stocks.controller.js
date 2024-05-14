import { pool } from "../db.js";

export const getStocks = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM stock");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};


export const getStock = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM stock WHERE id_stock = ?", [
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Stock table not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};


export const deleteStock = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Missing id parameter" });
        }


        const [rows] = await pool.query("DELETE FROM stock WHERE id_stock = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Stock not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};


export const createStock = async (req, res) => {
    try {
        const { id_variante, stock } = req.body;
        const [rows] = await pool.query(
            "INSERT INTO stock (id_variante, stock) VALUES (?, ?)",
            [id_variante, stock]
        );
        res.status(201).json({ id: rows.insertId, id_variante, stock });
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};



export const updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_variante, stock } = req.body;

        const [result] = await pool.query(
            "UPDATE stock SET id_variante = IFNULL(?, id_variante), stock = IFNULL(?, stock) WHERE id_stock = ?",
            [id_variante, stock, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Stock not found" });

        const [rows] = await pool.query("SELECT * FROM stock WHERE id_stock = ?", [
            id,
        ]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

