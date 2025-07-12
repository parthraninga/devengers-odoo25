const router = require('express').Router();
const productController = require("../Controller/ProductController");
const cacheMiddleware = require('../Middleware/CacheMiddleware');
const rateLimitMiddleware = require("../Middleware/RateLimitMiddleware")

// apply rateLimitMiddleware 
router.use(rateLimitMiddleware(5, 60)); // 5 requests per minute

router.post("/addProduct", productController.addProduct); // deleteCacheByPattern is called in the controller after adding a new product so that the cache is cleared and the new product is fetched from the database
router.put("/edit/:id", productController.editProduct);

router.get("/getAllProducts", cacheMiddleware("products", 3600), productController.getAllProducts);
router.get("/getProductById/:id", cacheMiddleware("product", 1800), productController.getProductById)

module.exports = router;