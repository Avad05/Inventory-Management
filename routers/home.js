const {Router} = require('express');
const homeRouter = Router();
const specsController = require('../controllers/specs');
const multer = require('multer');
const upload = multer({ dest: 'public/assets/' });

homeRouter.get("/", specsController.getAll);
homeRouter.get("/new", specsController.getEveryProds);
homeRouter.get("/categories/:id", specsController.getItemsByCategory);
homeRouter.post("/categories/:id", specsController.deleteCategory);
homeRouter.get("/items/:itemid", specsController.getProdInDetail);
homeRouter.get("/addcategory", specsController.addCategoriesForm);
homeRouter.post("/addcategory", specsController.addCategories);
homeRouter.get("/additem", specsController.addItemsForm);
homeRouter.post("/additem", upload.single('image_url'), specsController.addItems);
homeRouter.post("/items/:itemid", specsController.updateProduct);
homeRouter.post("/items/:itemid/delete", specsController.deleteItems);

module.exports = homeRouter;
