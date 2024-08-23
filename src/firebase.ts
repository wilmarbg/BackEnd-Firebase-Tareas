import { initializeApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import config from './config';

const firebaseApp: FirebaseApp = initializeApp(config.firebaseConfig as FirebaseOptions);

export default firebaseApp;