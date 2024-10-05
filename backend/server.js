import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from "mongoose";
import router from './src/routes/project_router.js';
import { } from 'dotenv/config';
import { createProxyMiddleware } from "http-proxy-middleware"; //for the CORS error //TODO
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
//TODO
app.use(cors({
    origin: 'https://jamoveo-frontend-s3iw.onrender.com',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

// create the proxy
// const proxyMiddleware = createProxyMiddleware({
//     target: 'https://jamoveo-backend-al1u.onrender.com', //target host with the same base path
//     changeOrigin: true, //needed for virtual hosted sites
// });


// app.use('/api', proxyMiddleware);//use proxy for API requests
app.use(express.static(path.join(__dirname, 'public'))); //middleware for handling access to files in the public folder
app.use(express.urlencoded({ extended: true })); //middleware for handling POST requests
app.use(express.json()); //middleware for convert data to JSON
app.use('/', router); //server routes

createServer(server);
server.listen(PORT, () => console.log(`Listen on port ${PORT}`));
