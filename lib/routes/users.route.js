"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = require('../controllers/users.controller');
const router = (0, express_1.Router)();
router.get("/users", controller.getUser);
router.get("/usersmail", controller.getUserByEmail);
router.post("/users", controller.createUser);
exports.default = router;
//# sourceMappingURL=users.route.js.map