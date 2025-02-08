import { pool } from "../db.js";

export const getCategories = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM category");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM category WHERE id = ?", [id]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM category WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Construir la URL de la imagen
    const image_url = `/uploads/${req.file.filename}`;

    // Verificar si el nombre fue enviado
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Insertar en la base de datos
    const [rows] = await pool.query(
      "INSERT INTO category (name, image_url) VALUES (?, ?)",
      [name, image_url]
    );

    
    res.status(201).json({ id: rows.insertId, name, image_url });
  } catch (error) {
    console.error("Error creating category:", error.message);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};


export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const [result] = await pool.query(
      "UPDATE category SET name = IFNULL(?, name) WHERE id = ?",
      [name, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Category not found" });

    const [rows] = await pool.query("SELECT * FROM category WHERE id = ?", [id]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
