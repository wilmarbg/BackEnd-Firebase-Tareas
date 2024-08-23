import { Request, Response } from "express";
import { User } from '../dto/users';
import firebase from '../firebase';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
  query,
  where,
} from 'firebase/firestore';

const db = getFirestore(firebase);

export const getUser = async (req: Request, res: Response) => {
  try {
    // Asumiendo que los usuarios están en una colección llamada 'users'
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const userArray: User[] = [];

    if (usersSnapshot.empty) {
      res.status(400).send('No Users found');
    } else {
      usersSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const user: User = {
          id: doc.id,
          username: doc.data().username,
          email: doc.data().email,
          // Agrega más campos según la estructura de tus datos de usuario
        };
        userArray.push(user);
      });
      console.log("ENTRO ACA: ", userArray)
      res.status(200).json(userArray); // Devuelve el array como JSON
    }
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const email = req.query.email; // Obtén el email desde los parámetros de la solicitud
    
        if (!email) {
          return res.status(400).send('Email parameter is required');
        }
    
        console.log("ENTRO A EMAIL")

        // Consulta para encontrar el usuario con el email especificado
        const usersQuery = query(collection(db, 'users'), where('email', '==', email));
        const usersSnapshot = await getDocs(usersQuery);
    
        if (usersSnapshot.empty) {
          return res.status(404).send('email no existe');
        } else {
          // Obtener el primer usuario encontrado
          const userDoc = usersSnapshot.docs[0];
          const userData = userDoc.data() as User; // Asegúrate de que los datos del usuario estén tipados correctamente
    
          const user: User = {
            id: userDoc.id,
            username: userData.username,
            email: userData.email,
            // Agrega más campos según la estructura de tus datos de usuario
          };
    
          return res.status(200).json(user); // Devuelve el usuario como JSON
        }
      } catch (error: any) {
        return res.status(400).send(error.message);
      }
  };

  export const createUser = async (req: Request, res: Response) => {
    try {
      const data: User = req.body; // Obtén los datos del cuerpo de la solicitud
  
      if (!data.username || !data.email) {
        return res.status(400).send('username y email son requeridos');
      }
  
      await addDoc(collection(db, 'users'), data);
      return res.status(201).send('Usuario creado con éxito'); // Código 201 para recursos creados
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  };