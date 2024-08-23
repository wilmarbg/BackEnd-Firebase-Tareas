import { Request, Response } from "express";
import { Tareas } from '../dto/tareas';
import firebase from '../firebase';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  DocumentData,
  QueryDocumentSnapshot,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';

const db = getFirestore(firebase);

export const getTareas = async (req: Request, res: Response) => {
    try {
      const tareaQuery = query(collection(db, 'tareas'), where('estado', '==', 'A'));
      const tareaCollection = await getDocs(tareaQuery);
      const tareaArray: Tareas[] = [];
  
      if (tareaCollection.empty) {
        res.status(400).send('Tarea no encontrada');
      } else {
        tareaCollection.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {

            const timestamp: Timestamp = doc.data().fecha_creacion;
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

          const user: Tareas = {
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
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  export const createTarea = async (req: Request, res: Response) => {
    try {
        const { titulo, descripcion } = req.body; 
  
      if (!titulo || !descripcion) {
        return res.status(400).send('el titulo y la descripción de la tarea son requeridos');
      }
  
      const data = {
        titulo: titulo,
        descripcion: descripcion,
        completado: false,
        fecha_creacion: Timestamp.fromDate(new Date()),
        estado: 'A'
      };

      const docCollection = await addDoc(collection(db, 'tareas'), data);

      const newTarea = await getDoc(docCollection);

      if (newTarea.exists()) {

        const timestamp: Timestamp = newTarea.data().fecha_creacion;
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

            const newData: Tareas = {
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
      
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  };

  export const updateTarea = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { titulo, descripcion } = req.body;
  
      if (!titulo || !descripcion) {
        return res.status(400).send('El título y la descripción y son requeridos');
      }
  
      const tareaColl = doc(db, 'tareas', id);
      
      const tareaDoc = await getDoc(tareaColl);
      
      if (!tareaDoc.exists()) {
        return res.status(404).send('Tarea no encontrada');
      }

      const updatedData = {
        titulo: titulo,
        descripcion: descripcion,
        fecha_actualizacion: Timestamp.fromDate(new Date()),
      };
  
      await updateDoc(tareaColl, updatedData);
  
      const updatedDoc = await getDoc(tareaColl);
  
      if (updatedDoc.exists()) {
        const timestamp: Timestamp = updatedDoc.data().fecha_creacion;
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
  
        const updatedTarea: Tareas = {
          id: updatedDoc.id,
          titulo: updatedDoc.data().titulo,
          descripcion: updatedDoc.data().descripcion,
          estadoTarea: estadoTarea,
          fechaCreacion: fechaFormateada,
        };
  
       return res.status(200).json(updatedTarea);
      } else {
       return res.status(404).send('Error al actualizar la tarea');
      }
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  };

  export const deleteTarea = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const tareaColl = doc(db, 'tareas', id);

      await deleteDoc(tareaColl);
  
      res.status(200).send('Tarea eliminada con éxito');
    } catch (error: any) {
      res.status(400).send(`Error al eliminar la tarea: ${error.message}`);
    }
  };

  export const updateTareaCompletado = async (req: Request, res: Response) => {
    try {
      const { id, completado } = req.body;

      if (typeof completado !== 'boolean') {
        return res.status(400).send('El campo "completado" debe ser un valor booleano (true o false).');
      }
  
      const tareaColl = doc(db, 'tareas', id);
  
      await updateDoc(tareaColl, { completado });
  
      return res.status(200).send('Tarea actualizada con éxito');
    } catch (error: any) {
      return res.status(400).send(`Error al actualizar la tarea: ${error.message}`);
    }
  };