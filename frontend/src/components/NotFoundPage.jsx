//import from react
import { useContext } from 'react';

//import react-router-dom
import { Link } from "react-router-dom";

//import libraries from material-ui
import Box from '@mui/material/Box';

//import components
import { AuthContextAdmin } from '../../src/context/AuthContextAdmin';


const NotFoundPage = () => {
    const { admin } = useContext(AuthContextAdmin); //getting the data about the admin from context

    const userLocalStorageInfo = localStorage.getItem('user');
    const userObject = JSON.parse(userLocalStorageInfo);
    const userLocalStorageName = userObject.username || userObject.adminname;

    let flag = admin && admin.adminname === userLocalStorageName ? true : false;
    let moveTo = '/MainPageAdmin';
    //check if the user is admin
    if (!flag) {
        flag = userObject && userObject.adminname ? true : false;
        moveTo = '/MainPagePlayer';
    }

    return (
        <>
            <Box
                sx={{
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
                }}
            >
                <Box sx={{ typography: 'subtitle2', fontSize: '20px', textAlign: 'center' }}>Page not found ☹️ 
                    <br/>
                    <Link to={moveTo}>
                        Return home page
                    </Link>
                </Box>
            </Box>
        </>
    )
}
export default NotFoundPage;