import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { allActivities, bookActivity, savedActivity } from "../controllers/activity.controller.js";

const router = Router();

// routes
router.get('/all', allActivities);
router.post('/book',isAuthenticated, bookActivity);
router.get('/saved-booking', isAuthenticated, savedActivity);

export default router;