//import from react
import { useLocation, Link } from 'react-router-dom';

//import components
import CardsSongs from './CardsSongs';

//import libraries from material-ui
import Box from '@mui/material/Box';

const ResultsPageAdmin = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const songQuery = searchParams.get('song');
    const searchResults = location.state?.searchResults || [];
    console.log(searchParams.get('song'));
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
                <h1>Results for: {songQuery}</h1>
                {searchResults.length > 0 ? (
                    searchResults.map((song) => (
                        <CardsSongs
                            key={song.songId}
                            songId={song.songId}
                            songName={song.songName}
                            songArtist={song.songArtist}
                            songImage={song.songImage}
                        />
                    ))
                ) : (
                    <div>
                        <p>No results found 😖</p>
                        <Link to="/MainPageAdmin">Go back to search</Link> {/* add a link to navigate back to the search page */}
                    </div>
                )}

            </Box>
        </>
    )
}
export default ResultsPageAdmin;