import { Server } from "socket.io";

const createServer = (server) => {
    // Initialize Socket.IO with CORS settings
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000", // Allow requests from the frontend
            methods: ["GET", "POST"]
        }
    });

    //SOCKET- When a user connects
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        //Listen for the admin quit event and broadcast it to all users
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
