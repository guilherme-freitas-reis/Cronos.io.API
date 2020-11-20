import express from "express";
const router = express.Router();
import email_controller from "../controllers/email.controller";

router.post("/create", email_controller.create);

module.exports = router;
