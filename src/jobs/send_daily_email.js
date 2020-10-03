import cron from "node-cron";
import task_controller from "../controllers/task.controller";

export default function send_daily_email() {
  cron.schedule("0 0 9 * * *", () => task_controller.send_daily_email());
}
