//import libraries from react
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//import libraries from material-ui
import Box from '@mui/material/Box';

//import components
import { AuthContext } from '../context/AuthContext';

//import SOCKET
import { io } from 'socket.io-client';

//initialize socket connection
const socket = io.connect(process.env.NODE_ENV === 'production' ? 'https://jamoveo-frontend-2usd.onrender.com' : 'http://localhost:8080')

const MainPagePlayer = () => {
    const { user } = useContext(AuthContext); //getting the data about the user from context
    const navigate = useNavigate();
    console.log("context", user);

    useEffect(() => {
        //listen for the songSelected event
        socket.on('songSelected', (songData) => {
            console.log('Song selected:', songData);
            //redirect to LivePage with the selected song ID
            navigate(`/LivePage/${songData.songId}`);
        });

        //cleanup socket event listener on component unmount
        return () => {
            socket.off('songSelected');
        };
    }, [navigate]); //adding navigate as a dependency

    return (
        <>
            <Box component="section" sx={{
                bgcolor: 'background.paper',
                boxShadow: 3, //increased shadow for better elevation
                borderRadius: 2,
                p: { xs: 2, sm: 4, md: 6 }, //padding adjusts based on screen size
                minWidth: { xs: '70%', sm: '250px' }, //full width on mobile, minimum width for larger screens
                maxWidth: { xs: '85%', sm: '350px', md: '450px' }, //control max width across devices
                mx: 'auto', //center the form horizontally
                my: 3, //margin to separate form from other elements
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                textAlign: 'center'
            }}>

                {/* use split to take only the first part of the user name, without @gmail.com */}
                <h1>Hello {user.username.split('@')[0]}</h1>
                {user.username ? (
                    <p>Your instrument: {user.instrument}</p> //display the user's instrument
                ) : (
                    <p>Please log in to see your instrument.</p>
                )}
                <p>Waiting for next song...</p>
            </Box>
        </>

    )
}
export default MainPagePlayer;