//import from react
import { useState } from 'react';

//import libraries from material-ui
import Box from '@mui/material/Box';
import { TextField, Button, Alert } from '@mui/material';

//import react-router-dom
import { useNavigate } from 'react-router-dom';


//import axios
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8080/';

const MainPageAdmin = () => {
    const initialFormDataSearch = {
        searchData: "",
    };

    const [formDataSearch, setFormDataSearch] = useState(initialFormDataSearch);
    const [textErr, setText] = useState("");
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormDataSearch({
            ...formDataSearch,
            [e.target.name]: e.target.value,

        });
    };

    //handle the search and filter results
    const handleSubmit = async (e) => {
        e.preventDefault();

        const searchText = formDataSearch.searchData.trim();

        //validate input
        if (!searchText) {
            setText("Please enter a song name.");
            setFlag(true);
            return;
        } else if (searchText.length < 2) {
            setText("The song name must be at least 2 characters long.");
            setFlag(true);
            return;
        }

        try {
            const res = await axios.get("/ResultsPageAdmin", { params: { song: formDataSearch.searchData } });
            setFormDataSearch(initialFormDataSearch);

            //navigate to ResultsPageAdmin and pass search results
            return navigate(`/ResultsPageAdmin?song=${formDataSearch.searchData}`, { state: { searchResults: res.data } });
        } catch (err) {
            console.log(err.response.data);
        }
    };

    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit}
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
                }}>
                <h1>Search any song...</h1>
                {/*alert for displaying error messages */}
                {flag && (
                    <Alert severity="error" sx={{ whiteSpace: "pre-line" }}>
                        {textErr}
                    </Alert>
                )}
                <TextField
                    name="searchData"
                    required
                    fullWidth
                    id="songSearch"
                    label="searchData"
                    type="search"
                    placeholder="Enter song name"
                    value={formDataSearch.searchData}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >Search</Button>
            </Box>
        </>
    )
}
export default MainPageAdmin;