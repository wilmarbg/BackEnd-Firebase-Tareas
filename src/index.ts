import express, { Express } from 'express';
import cors from 'cors';
//import config from './config';
import userRoute from './routes/users.route';
import tareaRoute from './routes/tareas.route';
import * as functions from 'firebase-functions';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use(userRoute);
app.use('/api', tareaRoute);

// app.listen(config.port, () => {
//     console.log(`Server is live @ ${config.hostUrl}`);
//   });   

exports.api = functions.https.onRequest(app);