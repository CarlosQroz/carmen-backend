import { pool } from "../db.js";

export const getObjects = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM object");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getObject = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM object WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Object not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteObject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Missing id parameter" });
    }
    const [rows] = await pool.query("DELETE FROM object WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Object not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createObject = async (req, res) => {
  try {
    const { category_id, name } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO object (category_id, name ) VALUES (?, ?)",
      [category_id, name]
    );
    res.status(201).json({ id: rows.insertId, category_id, name });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateObject = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, name } = req.body;

    const [result] = await pool.query(
      "UPDATE object SET category_id = IFNULL(?, category_id), name = IFNULL(?, name) WHERE id = ?",
      [category_id, name, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Object not found" });

    const [rows] = await pool.query("SELECT * FROM object WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
//Object by CategoryID
export const getObjectsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params; 
    const [rows] = await pool.query("SELECT * FROM object WHERE category_id = ?", [categoryId]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No objects found for this category" });
    }

    res.json(rows); 
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

