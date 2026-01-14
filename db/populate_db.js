require("dotenv").config();
const {Client} = require("pg");

const SQL = `

   DROP TABLE IF EXISTS items;
   DROP TABLE IF EXISTS categories;


   CREATE TABLE IF NOT EXISTS categories(
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   name VARCHAR(255) UNIQUE NOT NULL
   );

   INSERT INTO categories (name)
   VALUES 
   ('CPU'),
   ('MOTHERBOARD'),
   ('GPU'),
   ('RAM'),
   ('STORAGE'),
   ('CABINET')
   ON CONFLICT (name) DO NOTHING;


   CREATE TABLE IF NOT EXISTS items(
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   image_url VARCHAR(255),
   name VARCHAR(50) UNIQUE NOT NULL,
   price INTEGER NOT NULL,
   category_id INTEGER REFERENCES categories(id) ON DELETE RESTRICT,
   quantity INTEGER,
   specs JSONB NOT NULL
   );

   INSERT INTO items (image_url, name, price, category_id, quantity, specs) VALUES
   ('/assets/image.png', 'Intel', 34, 1, 23, '{"threads": "3" }'),
   ('/assets/image.png', 'Amd', 3765, 2, 45, '{"socket":"LGA1300"}'),
   ('/assets/image.png', 'Nvidia', 677, 3, 11, '{"heat":"less"}'),
   ('/assets/image.png', 'Zotac', 999, 4, 87, '{"DDR":"6"}'),
   ('/assets/image.png', 'Samsung', 234, 5, 34, '{"speed":"very fast"}'),
   ('/assets/image.png', 'Corsair', 190, 6, 86, '{"material":"glass"}')
    ON CONFLICT (name) DO NOTHING;                                              
   `;

async function main(){
    console.log('seeding...');
    const client = new Client({
        connectionString: process.env.DB_URL
    });

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('Done');
}

main();