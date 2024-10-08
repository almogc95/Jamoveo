//import from react
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//import libraries from material-ui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

//import SOCKET
import { io } from 'socket.io-client';

//import components
import { AuthContext } from '../context/AuthContext';
import { AuthContextAdmin } from '../context/AuthContextAdmin';

//import axios
import axios from '../axiosHTTPrequests';

const socket = io(process.env.REACT_APP_PROJECT_MODE === 'production' ? process.env.REACT_APP_BACKEND_URL : 'http://127.0.0.1:8080'); //react app's deployed URL/SOCKET URL

const LivePage = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); //getting the data about the user from context
    const { admin } = useContext(AuthContextAdmin); //getting the data about the admin from context
    const { songId } = useParams(); //getting the song ID from the URL
    const [song, setSong] = useState(null); //getting info about user for checking instrument
    const [error, setError] = useState(null); //setting error if accord
    const [isScrolling, setIsScrolling] = useState(false); //use this line for scrolling
    const [displayedLines, setDisplayedLines] = useState(3); // Start with 3 lines displayed

    const adminLocalStorageInfo = localStorage.getItem('admin');
    const adminObject = JSON.parse(adminLocalStorageInfo);
    const adminLocalStorageName = adminObject.adminname;

    let isAdmin = admin && adminLocalStorageName === "" ? false : true;

    //handle the quit event broadcasted from the server
    useEffect(() => {
        socket.on('quitGame', () => {
            //redirect to main page when the quit event is received
            isAdmin ? navigate("/MainPageAdmin") : navigate("/MainPagePlayer")
        });

        //cleanup socket event listener on component unmount
        return () => {
            socket.off('quitGame');
        };
    }, [isAdmin, navigate]);

    //function to handle admin quitting the game
    const handleQuit = () => {
        socket.emit('adminQuit'); // Emit 'adminQuit' event from admin
    };

    useEffect(() => {
        const fetchSong = async () => {
            try {
                //check if the project is in version production or development
                const res = process.env.REACT_APP_PROJECT_MODE === 'production'
                    ? await axios.get(`${process.env.REACT_APP_BACKEND_URL}/LivePage/${songId}`)
                    : await axios.get(`/LivePage/${songId}`);
                setSong(res.data); // Set the song data in state
            } catch (err) {
                setError(err.response.data.message); // Set error message if song is not found
            }
        };
        fetchSong();
    }, [songId]);

    //scroll functionality
    useEffect(() => {
        let scrollInterval;

        const startScrolling = () => {
            scrollInterval = setInterval(() => {
                window.scrollBy(0, 1); //scroll down by 1 pixel
            }, 120); //speed scroll
        };

        if (isScrolling) {
            startScrolling();
        } else {
            clearInterval(scrollInterval);
        }

        return () => clearInterval(scrollInterval);
    }, [isScrolling]);

    const isHebrew = (text) => /^[\u0590-\u05fe]+$/i.test(text); //checking if the song is in Hebrew and use it to change direction of the text

    if (error) {
        return <div>{error}</div>;
    }

    if (!song) {
        return <div>Loading...</div>; //show loading state while fetching
    }

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
                <Typography variant="h5" sx={{ fontSize: '35px' }}>{song.songName} | {song.songArtist}</Typography> {/* display song name */}
                {/* scrolling lyrics container */}
                <Box
                    id="lyrics-container"
                    sx={{
                        maxHeight: '400px',  // Set a max height for scrolling
                        overflowY: 'auto',    // Enable vertical scrolling
                        border: '1px solid #ccc',
                        p: 2,
                        mb: 2
                    }}>
                    {song.songLyrics.map((lineArray, lineIndex) => {
                        //change the direction based on the first lyric
                        const dir = isHebrew(lineArray[0]?.lyrics) ? 'rtl' : 'ltr';
                        return (
                            <Typography key={lineIndex} variant="body1" sx={{ fontSize: '30px' }} dir={dir}>
                                {lineArray.map((line, index) => (
                                    <span key={index}>
                                        &emsp;
                                        {user.instrument === "Vocals" && !isAdmin ? (
                                            line.lyrics
                                        ) : (
                                            <>
                                                {line.lyrics} {line.chords && <span>({line.chords})</span>}{" "}
                                            </>
                                        )}
                                    </span>

                                ))}
                            </Typography>
                        );
                    })}
                </Box>
                {/* scroll button */}
                <Button
                    variant="contained"
                    onClick={() => setIsScrolling(prev => !prev)}>
                    {isScrolling ? 'Stop Scrolling' : 'Start Scrolling'}
                </Button>

                {/* show the "Quit" button only if the user is an admin */}
                {isAdmin && (
                    <Button variant="contained" color="error" onClick={handleQuit}>
                        Quit
                    </Button>
                )}
            </Box>
        </>
    )
}
export default LivePage;