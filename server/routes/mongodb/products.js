const controller = require("../../controllers/products")
const router = require("express").Router()

router.get("/", controller.get)
router.get("/:id", controller.getById) 
router.post("/", controller.post) 
router.put("/:id", controller.put) 
router.delete("/:id", controller.delete) 

module.exports = router