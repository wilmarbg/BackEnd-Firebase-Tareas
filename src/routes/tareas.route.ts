import { Router} from 'express';

const controller = require('../controllers/tareas.controller')

const router = Router();

router.get("/tareas", controller.getTareas);
router.post("/tareas", controller.createTarea);
router.post("/tareas/completado", controller.updateTareaCompletado);
router.put('/tareas/:id', controller.updateTarea);
router.delete('/tareas/:id', controller.deleteTarea);

export default router;