const db = require('../db/query');

async function getAll (req, res){
    const specs = await db.getEverything();
    res.render("index",{specs:specs, title:"All Categories"} );
}

async function getEveryProds(req, res){
    const products = await db.getProds();
    res.render("products", {prods:products, title:"All Products"});
}

async function getItemsByCategory(req, res){
    const category_id = req.params.id;


    try{
        const category = await db.viewCategory(category_id);
        if(!category){
            res.status(500).send("Category Not found");
        }

        const items = await db.getItemsByCategory(category_id);

        res.render("specificCategory/show", {category, items});

    }catch(err){
       console.log(err);
       res.status(500).send("Database error");
    }

}

async function getProdInDetail(req, res){
    const {itemid} = req.params;
    try{
        const details = await db.getDetails(itemid);
        if(!details){
           res.status(500).send("No Item found");
        }
        
         res.render("items", {details:details});
    }catch(err){
       console.log(err);
       res.status(500).send("Database Error");
    }
}

async function addCategoriesForm (req, res){
    res.render("categoryForm");
}

async function addCategories(req, res) {
    try {
        const { name } = req.body;
        console.log("Adding Category:", name);

        if (!name) {
            return res.status(400).send("Category name is required");
        }

        await db.addCategory(name);
        
        
        return res.redirect("/"); 

    } catch (error) {
        console.error("DB Error:", error);
        
        if (!res.headersSent) {
            return res.status(500).send("Database Error: " + error.message);
        }
    }
}

async function addItemsForm(req, res) {
    try{
        const getcategory = await db.getEverything();
        res.render("itemForm", {getcategory});
    }catch(err){
        res.status(500).send(err)
    }        
}

async function addItems(req, res) {
    try {
        const {item, price, category, quantity, specs } = req.body;
        const image_url = req.file ? `/assets/${req.file.filename}` : '/assets/image.png';
      
        if (!image_url || !item || !price || !category || !quantity || !specs) {
            return res.status(400).send("Fill the Complete form"); 
        }

        const numericPrice = parseFloat(price);
        const numericQuantity = parseInt(quantity, 10);
        const numericCategoryId = parseInt(category, 10);

        //To allow non JSON type in db

        let finalspecs;
        try{
            finalspecs = JSON.parse(specs);
        }catch(e){
            finalspecs = {Description: specs};
        }

        
        if (isNaN(numericCategoryId)) {
            return res.status(400).send("Invalid Category format");
        }

        await db.addItem(image_url, item, numericPrice, numericCategoryId, numericQuantity, finalspecs);
        
        return res.redirect(`/categories/${numericCategoryId}`);
        
    } catch (error) {
        console.error("DB Error:", error);
        if (!res.headersSent) {
            return res.status(500).send("Database Error: " + error.message);
        }
    }
}

async function updateProduct(req, res) {
    const { itemid } = req.params;
    const { action, newPrice } = req.body;

    try {
        if (action === 'increment') {
            await db.updateQuantity(1, itemid);
        } else if (action === 'decrement') {
            await db.updateQuantity(-1, itemid);
        } else if (action === 'changePrice') {
            await db.updatePrice(newPrice, itemid );
        }

        res.redirect(`/items/${itemid}`); 
    } catch (err) {
        console.error(err);
        res.status(500).send("Update failed");
    }
}

async function deleteItems(req, res) {
    const {itemid} = req.params;
  
    try{
        const deletedItem = await db.getDetails(itemid);        
        console.log(deletedItem);
        if(!deletedItem){
            return res.status(400).send("Item is already Deleted");
        }
        const name = deletedItem.name;
        const cat_id = deletedItem.category_id;
        await db.deleteItem(itemid); 
        res.redirect(`/categories/${cat_id}`);     
    }catch(error){
        console.log(error);
        res.status(550).send("Deletion failed")
    }
}

async function deleteCategory(req, res) {
    const {id} = req.params;
    const {adminpwd} = req.body;

    if(adminpwd !== process.env.ADMIN_PASSWORD){
        return res.status(401).send('Wrong Password');
    }
        
    try{
       await db.deleteCategory(id);
       if(!id){
        res.send("Id not received")
       }
       res.redirect("/");
    }catch(err){
        res.status(500).send('Fatal Error');
    }
}

module.exports = {  
    getEveryProds,
     getAll,
     getItemsByCategory,
     getProdInDetail,
     addCategoriesForm,
     addCategories,
     addItemsForm,
     addItems,
     updateProduct,
     deleteItems,
     deleteCategory
}