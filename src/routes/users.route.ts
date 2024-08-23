import { Router} from 'express';

const controller = require('../controllers/users.controller')

const router = Router();

router.get("/users", controller.getUser);
router.get("/usersmail", controller.getUserByEmail);

router.post("/users", controller.createUser);

export default router;