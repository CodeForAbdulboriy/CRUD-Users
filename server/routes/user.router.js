const express = require("express");
const userController = require("../controllers/user.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.get("/", userController.get);
router.post("/reg", userController.reg);
router.post("/verify-email", userController.verify);
router.post("/delete", userController.delete);
router.post("/log", userController.login);
router.get("/profile", authMiddleware, userController.getProfile);

module.exports = router;