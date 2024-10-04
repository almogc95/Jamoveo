import { Server } from "socket.io";

const createServer = (server) => {
    // Initialize Socket.IO with CORS settings
    const io = new Server(server, {
        cors: {
            // origin: "https://jamoveo-frontend-s3iw.onrender.com"  //allow requests from the frontend TODO
            origin: "*", //allow requests from the frontend TODO
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    //SOCKET- When a user connects
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        //listen for the admin quit event and broadcast it to all users
        socket.on('adminSelectSong', (data) => {
            console.log('Admin selected a song:', data);
            //Broadcast the selected song to all connected users
            io.emit('songSelected', data);
        });

        //listen for the "adminQuit" event from the client
        socket.on('adminQuit', () => {
            console.log('Admin has quit the game');
            io.emit('quitGame'); // Broadcast "quitGame" to all clients
        });
    });
}
export default createServer;
