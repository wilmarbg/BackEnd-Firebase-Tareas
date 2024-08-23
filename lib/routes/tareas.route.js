"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = require('../controllers/tareas.controller');
const router = (0, express_1.Router)();
router.get("/tareas", controller.getTareas);
router.post("/tareas", controller.createTarea);
router.post("/tareas/completado", controller.updateTareaCompletado);
router.put('/tareas/:id', controller.updateTarea);
router.delete('/tareas/:id', controller.deleteTarea);
exports.default = router;
//# sourceMappingURL=tareas.route.js.map