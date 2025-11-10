import { sql } from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await sql`SELECT * FROM products ORDER BY created_at DESC`;
    console.log("Fetched products:", products);
    res.status(200).json({ sucess: true, data: products });
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, image, price } = req.body;

  if (!name || !image || !price) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const newProduct = await sql`INSERT INTO products (name, image, price)
    VALUES (${name}, ${image}, ${image})
    RETURNING *
    `;
    // console.log("new product addded:", newProduct);
    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.error("Error in creatingProduct function:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sql`
    SELECT * FROM products WHERE id = ${id}`;
    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.error("Error in retProduct function:", error);
    res.status(500).json({ sucess: false, message: "Internal Server Error" });
  }
};
// export const updateProduct = async (req, res) => {};
// export const deleteProduct = async (req, res) => {};
