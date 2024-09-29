import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from "mongoose";
import router from './src/routes/project_router.js';
import { } from 'dotenv/config';
import cors from 'cors';
//import for SOCKET
import http from 'http';
import createServer from "./sockets/createServer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

//connect to MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI;

//connect to MongoDB Atlas
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//mongoDB Connection Handling
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

//CORS setup 
app.use(cors({
    origin: 'https://jamoveo-frontend-2usd.onrender.com' //react app's deployed URL
}));

app.use(express.urlencoded({ extended: true })); //middleware for handling POST requests
app.use(express.json()); //middleware for convert data to JSON
app.use('/', router); //server routes

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//middleware for handling access to files in the public folder
app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => console.log(`Listen on port ${PORT}`));
createServer(server);