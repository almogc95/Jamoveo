//import libraries from material-ui
import Box from '@mui/material/Box';
import { Typography, Button } from '@mui/material';

//import react-router-dom
import { Link } from 'react-router-dom';

//import the image
import rehearsalImage from '../assets/images/rehearsal.jpg';


const HomePage = () => {
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

                <Typography variant="h5" sx={{ fontSize: '40px' }}><b>Jamoveo</b></Typography>
                <img src={rehearsalImage} alt="Rehearsal" />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    <Link to="/SignIn" style={{ color: 'white', textDecoration: 'none' }}>Start play!</Link> {/* add a link to move page */}
                </Button>
            </Box>
        </>
    )
}
export default HomePage;