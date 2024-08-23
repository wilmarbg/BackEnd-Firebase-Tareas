"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTareaCompletado = exports.deleteTarea = exports.updateTarea = exports.createTarea = exports.getTareas = void 0;
const firebase_1 = __importDefault(require("../firebase"));
const firestore_1 = require("firebase/firestore");
const db = (0, firestore_1.getFirestore)(firebase_1.default);
const getTareas = async (req, res) => {
    try {
        const tareaQuery = (0, firestore_1.query)((0, firestore_1.collection)(db, 'tareas'), (0, firestore_1.where)('estado', '==', 'A'));
        const tareaCollection = await (0, firestore_1.getDocs)(tareaQuery);
        const tareaArray = [];
        if (tareaCollection.empty) {
            res.status(400).send('Tarea no encontrada');
        }
        else {
            tareaCollection.forEach((doc) => {
                const timestamp = doc.data().fecha_creacion;
                const fechaCreacion = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
                const fechaFormateada = fechaCreacion.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                });
                const estadoTarea = doc.data().completado ? 'completada' : 'pendiente';
                const user = {
                    id: doc.id,
                    titulo: doc.data().titulo,
                    descripcion: doc.data().descripcion,
                    estadoTarea: estadoTarea,
                    fechaCreacion: fechaFormateada,
                };
                tareaArray.push(user);
            });
            res.status(200).json(tareaArray);
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};
exports.getTareas = getTareas;
const createTarea = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        if (!titulo || !descripcion) {
            return res.status(400).send('el titulo y la descripción de la tarea son requeridos');
        }
        const data = {
            titulo: titulo,
            descripcion: descripcion,
            completado: false,
            fecha_creacion: firestore_1.Timestamp.fromDate(new Date()),
            estado: 'A'
        };
        const docCollection = await (0, firestore_1.addDoc)((0, firestore_1.collection)(db, 'tareas'), data);
        const newTarea = await (0, firestore_1.getDoc)(docCollection);
        if (newTarea.exists()) {
            const timestamp = newTarea.data().fecha_creacion;
            const fechaCreacion = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
            const fechaFormateada = fechaCreacion.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            const estadoTarea = newTarea.data().completado ? 'completada' : 'pendiente';
            const newData = {
                id: newTarea.id,
                titulo: newTarea.data().titulo,
                descripcion: newTarea.data().descripcion,
                estadoTarea: estadoTarea,
                fechaCreacion: fechaFormateada,
            };
            return res.status(201).json(newData);
        }
        else {
            return res.status(404).send('Error al crear la tarea');
        }
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
};
exports.createTarea = createTarea;
const updateTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion } = req.body;
        if (!titulo || !descripcion) {
            return res.status(400).send('El título y la descripción y son requeridos');
        }
        const tareaColl = (0, firestore_1.doc)(db, 'tareas', id);
        const tareaDoc = await (0, firestore_1.getDoc)(tareaColl);
        if (!tareaDoc.exists()) {
            return res.status(404).send('Tarea no encontrada');
        }
        const updatedData = {
            titulo: titulo,
            descripcion: descripcion,
            fecha_actualizacion: firestore_1.Timestamp.fromDate(new Date()),
        };
        await (0, firestore_1.updateDoc)(tareaColl, updatedData);
        const updatedDoc = await (0, firestore_1.getDoc)(tareaColl);
        if (updatedDoc.exists()) {
            const timestamp = updatedDoc.data().fecha_creacion;
            const fechaCreacion = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
            const fechaFormateada = fechaCreacion.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            const estadoTarea = updatedDoc.data().completado ? 'completada' : 'pendiente';
            const updatedTarea = {
                id: updatedDoc.id,
                titulo: updatedDoc.data().titulo,
                descripcion: updatedDoc.data().descripcion,
                estadoTarea: estadoTarea,
                fechaCreacion: fechaFormateada,
            };
            return res.status(200).json(updatedTarea);
        }
        else {
            return res.status(404).send('Error al actualizar la tarea');
        }
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
};
exports.updateTarea = updateTarea;
const deleteTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const tareaColl = (0, firestore_1.doc)(db, 'tareas', id);
        await (0, firestore_1.deleteDoc)(tareaColl);
        res.status(200).send('Tarea eliminada con éxito');
    }
    catch (error) {
        res.status(400).send(`Error al eliminar la tarea: ${error.message}`);
    }
};
exports.deleteTarea = deleteTarea;
const updateTareaCompletado = async (req, res) => {
    try {
        const { id, completado } = req.body;
        if (typeof completado !== 'boolean') {
            return res.status(400).send('El campo "completado" debe ser un valor booleano (true o false).');
        }
        const tareaColl = (0, firestore_1.doc)(db, 'tareas', id);
        await (0, firestore_1.updateDoc)(tareaColl, { completado });
        return res.status(200).send('Tarea actualizada con éxito');
    }
    catch (error) {
        return res.status(400).send(`Error al actualizar la tarea: ${error.message}`);
    }
};
exports.updateTareaCompletado = updateTareaCompletado;
//# sourceMappingURL=tareas.controller.js.map