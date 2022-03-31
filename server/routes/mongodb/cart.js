const controller = require("../../controllers/carts")
const router = require("express").Router()

router.post("/", controller.create) 
router.delete("/:id", controller.delete) 
router.get("/:id/products", controller.getById) 
router.post("/:id/products/:idProd", controller.addProd) 
router.delete("/:id/products/:idProd", controller.delProd) 

module.exports = router