import { pool } from "../db.js";

export const getVentas = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM ventas");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const getVenta = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("SELECT * FROM ventas WHERE id_venta = ?", [
        id,
      ]);
  
      if (rows.length <= 0) {
        return res.status(404).json({ message: "Ventas table not found" });
      }
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };

  
export const deleteVenta = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Missing id parameter" });
        }


        const [rows] = await pool.query("DELETE FROM ventas WHERE id_venta = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Venta not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const createVenta = async (req, res) => {
    try {
        const { fecha, id_stock, cantidad, precio_unitario, detalles } = req.body;
        const [rows] = await pool.query(
            "INSERT INTO ventas (fecha, id_stock, cantidad, precio_unitario, detalles) VALUES (?, ?, ?, ?, ?)",
            [fecha, id_stock, cantidad, precio_unitario, detalles]
        );
        res.status(201).json({ id: rows.insertId, fecha, id_stock, cantidad, precio_unitario, detalles });
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};


export const updateVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha, id_stock, cantidad, precio_unitario, detalles } = req.body;

        const [result] = await pool.query(
            "UPDATE ventas SET fecha = IFNULL(?, fecha), id_stock = IFNULL(?, id_stock), cantidad = IFNULL(?, cantidad), precio_unitario = IFNULL(?, precio_unitario ), detalles = IFNULL(?, detalles) WHERE id_venta = ?",
            [fecha, id_stock, cantidad, precio_unitario, detalles, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Ventas not found" });

        const [rows] = await pool.query("SELECT * FROM ventas WHERE id_venta = ?", [
            id,
        ]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};


