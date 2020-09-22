import express from "express";
const router = express.Router();
import newsletter_controller from "../controllers/newsletter.controller";

router.get("/index", newsletter_controller.index);
router.post("/create", newsletter_controller.create);
router.delete("/delete/:id", newsletter_controller.delete);
router.delete("/deleteAll", newsletter_controller.deleteAll);

module.exports = router;
