import express from "express";
const router = express.Router();
import task_controller from "../controllers/task.controller";

router.get("/index", task_controller.index);
router.post("/create", task_controller.create);
router.delete("/delete/:id", task_controller.delete);
router.delete("/deleteAll", task_controller.deleteAll);

module.exports = router;
