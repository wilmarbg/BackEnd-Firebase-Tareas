"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const config_1 = __importDefault(require("./config"));
const firebaseApp = (0, app_1.initializeApp)(config_1.default.firebaseConfig);
exports.default = firebaseApp;
//# sourceMappingURL=firebase.js.map