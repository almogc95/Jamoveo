//import react-router-dom
import { useNavigate } from 'react-router-dom';

//import libraries from material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

//import SOCKET
import { io } from 'socket.io-client';

//import axios
import axios from '../axiosHTTPrequests';

const socket = io(process.env.NODE_ENV === 'production' ?
    'https://jamoveo-backend-al1u.onrender.com' :
    'http://127.0.0.1:8080'); //react app's deployed URL/SOCKET URL


const CardsSongs = (props) => {
    const navigate = useNavigate();

    //handle for select song
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            process.env.NODE_ENV === 'production' ?
                await axios.get(`${process.env.REACT_APP_BACKEND_URL}/LivePage/${props.songId}`) :
                await axios.get(`/LivePage/${props.songId}`); //check if the project is in version production or development
            const songData = { songId: props.songId, songName: props.songName, songArtist: props.songArtist, songImage: props.songImage }
            //emit an event to all connected users to navigate to the selected song
            socket.emit('adminSelectSong', songData);
            //navigate to LivePage according to the selected song
            return navigate(`/LivePage/${props.songId}`);
        } catch (err) {
            console.log(err.response ? err.response.data : err);
        }
    };
    return (
        <Card
            onClick={handleClick}
            sx={{ maxWidth: 345, marginBottom: 2 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.songImage ? `${props.songImage}` : require('../assets/images/defaultSongImage.jpg')}
                    alt={props.songName}
                    onError={(e) => { //if the image not view correct, view default image
                        e.target.onError = null;
                        e.target.src = require('../assets/images/defaultSongImage.jpg')
                    }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.songName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {props.songArtist}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default CardsSongs;