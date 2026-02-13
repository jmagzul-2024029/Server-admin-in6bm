import dotenv from 'dotenv';
import { initServer } from "./configs/app.js";

dotenv.config();

process.on('uncaughtException', (err) => {
    console.error('Uncought Exception in Admin Server: ', err);
    process.exit(1);
})

process.on('uncaughtException', (err, promise) => {
    console.error('Uncought Rejection at: ', promise, 'reason: ', err);
    process.exit(1);
})

console.log('Starting KinalSports Admin Server...');
initServer();