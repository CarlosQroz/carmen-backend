import { pool } from "../db.js";

export const getDetails = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM detail");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM detail WHERE id = ?", [
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

export const deleteDetail = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Missing id parameter" });
    }
    const [rows] = await pool.query("DELETE FROM detail WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Object not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createDetail = async (req, res) => {
  try {
    const { object_id, details, stock, precio_unitario } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO detail (object_id, details, stock, precio_unitario ) VALUES (?, ?, ?, ?)",
      [object_id, details, stock, precio_unitario]
    );
    res.status(201).json({ id: rows.insertId, object_id, details, stock, precio_unitario });
  } catch (error) { 
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { object_id, details, stock, precio_unitario } = req.body;

    const [result] = await pool.query(
      "UPDATE detail SET object_id = IFNULL(?, object_id), details = IFNULL(?, details), stock = IFNULL(?, stock), precio_unitario = IFNULL(?, precio_unitario) WHERE id = ?",
      [object_id, details, stock, precio_unitario, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Object not found" });

    const [rows] = await pool.query("SELECT * FROM detail WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

//desde aqui empieza el historial que agrega los llenados de stocks

// Función para añadir stock y registrar en el historial
export const getStockHistory = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM stock_history");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const addStock = async (req, res) => {
  try {
    const { id } = req.params; // El id del detalle al que se le va a añadir stock
    const { quantity } = req.body; // La cantidad a añadir al stock existente

    // Primero, obtenemos el stock actual y los datos relacionados
    const [currentStockRows] = await pool.query(`
      SELECT 
        d.stock, 
        d.details, 
        o.name AS object_name, 
        c.name AS category_name 
      FROM detail d
      JOIN object o ON d.object_id = o.id
      JOIN category c ON o.category_id = c.id
      WHERE d.id = ?
    `, [id]);

    if (currentStockRows.length <= 0) {
      return res.status(404).json({ message: "Detail not found" });
    }

    const currentStock = currentStockRows[0].stock;
    const details = currentStockRows[0].details;
    const objectName = currentStockRows[0].object_name;
    const categoryName = currentStockRows[0].category_name;

    // Calculamos el nuevo stock
    const newStock = currentStock + quantity;

    // Actualizamos el stock en la base de datos
    const [result] = await pool.query(
      "UPDATE detail SET stock = ? WHERE id = ?",
      [newStock, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Detail not found" });
    }

    // Insertamos el registro en el historial de stock sin clave foránea
    const [historyResult] = await pool.query(`
      INSERT INTO stock_history (detail_id, category_name, object_name, details, quantity_added, new_stock) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, [id, categoryName, objectName, details, quantity, newStock]);

    // Devolvemos la información requerida del registro recién agregado al historial
    const newHistoryEntry = {
      id: historyResult.insertId,
      detail_id: id,
      category_name: categoryName,
      object_name: objectName,
      details: details,
      quantity_added: quantity,
      new_stock: newStock
    };

    res.json(newHistoryEntry);
  } catch (error) {
    console.error(error); // Para ayudar con la depuración
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

//ventas
export const sellStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    // Obtener los detalles actuales del producto
    const [currentDetails] = await pool.query("SELECT * FROM detail WHERE id = ?", [id]);

    if (currentDetails.length === 0) {
      return res.status(404).json({ message: "Detail not found" });
    }

    const detail = currentDetails[0];

    // Verificar si hay suficiente stock
    if (detail.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // Reducir el stock
    const newStock = detail.stock - quantity;
    await pool.query("UPDATE detail SET stock = ? WHERE id = ?", [newStock, id]);

    // Registrar la venta en el historial de ventas
    await pool.query(
      "INSERT INTO sales_history (object_id, details, quantity_sold, remaining_stock, sale_price) VALUES (?, ?, ?, ?, ?)",
      [detail.object_id, detail.details, quantity, newStock, detail.precio_unitario]
    );

    // Obtener el nombre de la categoría y el objeto para la respuesta
    const [category] = await pool.query("SELECT name FROM category WHERE id = ?", [detail.object_id]);
    const [object] = await pool.query("SELECT name FROM object WHERE id = ?", [detail.object_id]);

    res.json({
      category_name: category[0].name,
      object_name: object[0].name,
      details: detail.details,
      quantity_sold: quantity,
      remaining_stock: newStock,
      sale_price: detail.precio_unitario
    });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
