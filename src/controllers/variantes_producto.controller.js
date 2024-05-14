import { pool } from "../db.js";

export const getVariantes_Productos = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM variantes_producto");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const getVariantes_Producto = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("SELECT * FROM variantes_producto WHERE id_variante = ?", [
        id,
      ]);
  
      if (rows.length <= 0) {
        return res.status(404).json({ message: "Variante_Producto not found" });
      }
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };

  
export const deleteVariante_Producto = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Missing id parameter" });
        }


        const [rows] = await pool.query("DELETE FROM variantes_producto WHERE id_variante = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Producto not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};


export const createVariante_Producto = async (req, res) => {
    try {
        const { id_producto, talla, precio } = req.body;
        const [rows] = await pool.query(
            "INSERT INTO variantes_producto (id_producto, talla, precio) VALUES (?, ?, ?)",
            [id_producto, talla, precio]
        );
        res.status(201).json({ id: rows.insertId, id_producto, talla, precio });
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const updateVariantes_Producto = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_producto, talla, precio } = req.body;

        const [result] = await pool.query(
            "UPDATE variantes_producto SET id_producto = IFNULL(?, id_producto), talla = IFNULL(?, talla), precio = IFNULL(?, precio) WHERE id_variante = ?",
            [id_producto, talla, precio, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Productos not found" });

        const [rows] = await pool.query("SELECT * FROM variantes_producto WHERE id_variante = ?", [
            id,
        ]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};



