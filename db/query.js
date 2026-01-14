const { reconstructFieldPath } = require('express-validator/lib/field-selection');
const pool = require('../db/pool');

async function getEverything() {
    const {rows} = await pool.query("SELECT * FROM categories")
    return rows;
}

async function getProds(){
    const {rows} = await pool.query("SELECT * FROM items")
    return rows;
}

async function insert(parts){
    await pool.query('INSERT INTO categories(parts) VALUES($1)',[parts]);
}

async function viewCategory(categoryId){
    const result = await pool.query(`
        SELECT id, name FROM categories WHERE id = $1`, [categoryId]);

        return result.rows[0];
}

async function getItemsByCategory(categoryId) {
  const result = await pool.query(
    `
    SELECT id, image_url, name, price, category_id, quantity, specs
    FROM items
    WHERE category_id = $1
    ORDER BY quantity;
    `,
    [categoryId]
  );
  return result.rows;
}

async function getDetails(itemId) {
    const results = await pool.query(
        `
        SELECT id, image_url, name, price, category_id, quantity, specs
        FROM items
        WHERE id = $1;
        `,
        [itemId]
    );
    return results.rows[0];
}

async function addCategory(catName){
    const category = await pool.query(
        `INSERT INTO categories (name) VALUES ($1) ON CONFLICT (name) DO NOTHING`,[catName]
    );
}

async function addItem(image_url, itemName, price, cat_id, quantity, specs){
    const item = await pool.query(
        `INSERT INTO items (image_url, name, price, category_id, quantity, specs) VALUES
         ($1, $2, $3, $4, $5, $6)`,[image_url, itemName, price, cat_id, quantity, specs]
    );
}

async function updateQuantity(quantity, itemId) {
     await pool.query(`UPDATE items SET quantity = quantity + $1 WHERE id = $2`,
        [quantity, itemId]
     );    
}

async function updatePrice(newPrice, itemId){
    await pool.query(`UPDATE items SET price = $1 WHERE id = $2`,
        [newPrice, itemId]
    );
}

async function deleteItem(itemId) {
    await pool.query(`DELETE FROM items WHERE id = $1`, [itemId]);
}

async function deleteCategory(itemId){
    await pool.query(`DELETE FROM categories WHERE id = $1`, [itemId]);
}

module.exports = ({
    getEverything,
    insert,
    getProds,
    viewCategory,
    getItemsByCategory,
    getDetails,
    addCategory,
    addItem,
    updateQuantity,
    updatePrice,
    deleteItem,
    deleteCategory
})