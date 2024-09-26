import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from "mongoose";
import router from './src/routes/project_router.js';
import { } from 'dotenv/config';
import cors from 'cors';
//Import for SOCKET
import http from 'http';
import createServer from "./sockets/createServer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

//Connect to MongoDB Atlas
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@jamoveo.shwrj.mongodb.net/?retryWrites=true&w=majority&appName=Jamoveo`;

mongoose.connect(MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

app.use(cors());//To allow different domain 
app.use(express.static(path.join(__dirname, 'public')));  //In order to access the files in the public folder
app.use(express.urlencoded({ extended: true })); //For POST method
app.use(express.json()); //Convert data to JSON
app.use('/', router); //Using routes

server.listen(PORT, () => console.log(`Listen on port ${PORT}`));
createServer(server);