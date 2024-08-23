"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserByEmail = exports.getUser = void 0;
const firebase_1 = __importDefault(require("../firebase"));
const firestore_1 = require("firebase/firestore");
const db = (0, firestore_1.getFirestore)(firebase_1.default);
const getUser = async (req, res) => {
    try {
        // Asumiendo que los usuarios están en una colección llamada 'users'
        const usersSnapshot = await (0, firestore_1.getDocs)((0, firestore_1.collection)(db, 'users'));
        const userArray = [];
        if (usersSnapshot.empty) {
            res.status(400).send('No Users found');
        }
        else {
            usersSnapshot.forEach((doc) => {
                const user = {
                    id: doc.id,
                    username: doc.data().username,
                    email: doc.data().email,
                    // Agrega más campos según la estructura de tus datos de usuario
                };
                userArray.push(user);
            });
            res.status(200).json(userArray); // Devuelve el array como JSON
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};
exports.getUser = getUser;
const getUserByEmail = async (req, res) => {
    try {
        const email = req.query.email; // Obtén el email desde los parámetros de la solicitud
        if (!email) {
            return res.status(400).send('Email parameter is required');
        }
        console.log("ENTRO A EMAIL");
        // Consulta para encontrar el usuario con el email especificado
        const usersQuery = (0, firestore_1.query)((0, firestore_1.collection)(db, 'users'), (0, firestore_1.where)('email', '==', email));
        const usersSnapshot = await (0, firestore_1.getDocs)(usersQuery);
        if (usersSnapshot.empty) {
            return res.status(404).send('email no existe');
        }
        else {
            // Obtener el primer usuario encontrado
            const userDoc = usersSnapshot.docs[0];
            const userData = userDoc.data(); // Asegúrate de que los datos del usuario estén tipados correctamente
            const user = {
                id: userDoc.id,
                username: userData.username,
                email: userData.email,
                // Agrega más campos según la estructura de tus datos de usuario
            };
            return res.status(200).json(user); // Devuelve el usuario como JSON
        }
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
};
exports.getUserByEmail = getUserByEmail;
const createUser = async (req, res) => {
    try {
        const data = req.body; // Obtén los datos del cuerpo de la solicitud
        if (!data.username || !data.email) {
            return res.status(400).send('username y email son requeridos');
        }
        await (0, firestore_1.addDoc)((0, firestore_1.collection)(db, 'users'), data);
        return res.status(201).send('Usuario creado con éxito'); // Código 201 para recursos creados
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
};
exports.createUser = createUser;
//# sourceMappingURL=users.controller.js.map