import { pool } from "../db.js";

export const getPeriods = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM period");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const getPeriod = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("SELECT * FROM period WHERE id = ?", [
        id,
      ]);
  
      if (rows.length <= 0) {
        return res.status(404).json({ message: "Period not found" });
      }
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  
  export const deletePeriod = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("DELETE FROM period WHERE id = ?", [id]);
  
      if (rows.affectedRows <= 0) {
        return res.status(404).json({ message: "Period not found" });
      }
  
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  
  export const createPeriod = async (req, res) => {
    try {
      const { name } = req.body;
      const [rows] = await pool.query(
        "INSERT INTO period (name) VALUES (?)",
        [name]
      );
      res.status(201).json({ id: rows.insertId, name });
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  
  export const updatePeriod = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
  
      const [result] = await pool.query(
        "UPDATE period SET name = IFNULL(?, name) WHERE id = ?",
        [name, id]
      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Period not found" });
  
      const [rows] = await pool.query("SELECT * FROM period WHERE id = ?", [
        id,
      ]);
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  