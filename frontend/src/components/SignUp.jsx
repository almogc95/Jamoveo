//import from react
import { useState, useContext } from 'react';

//import react-router-dom
import { Link, useNavigate } from 'react-router-dom';

//import libraries from material-ui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';

//import components
import { AuthContext } from '../../src/context/AuthContext';

//import axios
import axios from '../axiosHTTPrequests';

const SignUp = () => {
    const initialFormData = {
        username: "",
        password: "",
        instrument: ""
    };

    const [formData, setFormData] = useState(initialFormData);
    const { signUp } = useContext(AuthContext);
    const [userNameError, setUserNameError] = useState(false);
    const [userPasswordError, setUserPasswordError] = useState(false);
    const [userInstrumentError, setUserInstrumentError] = useState(false);
    const [textErr, setText] = useState("");
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,

        });
    };

    const handleErrors = (err) => {
        setUserNameError(false);
        setUserPasswordError(false);
        setUserInstrumentError(false);

        if (err.response?.data) {
            const { errors, msg } = err.response.data;

            if (msg) {
                // Display the error message returned from the server
                setText(msg);
                setFlag(true);
                return;
            }

            if (errors) {
                errors.forEach(error => {
                    if (error.param === "username") {
                        setUserNameError(true);
                    } else if (error.param === "password") {
                        setUserPasswordError(true);
                    } else if (error.param === "instrument") {
                        setUserInstrumentError(true);
                    }
                });
                setText("Validation errors occurred");
                setFlag(true);
            }
        } else {
            setText("Oops! Something went wrong");
            setFlag(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserNameError(!formData.username);
        setUserPasswordError(!formData.password);
        setUserInstrumentError(!formData.instrument);

        if (!formData.username || !formData.password || !formData.instrument) {
            setText("Oops! Looks like some of the fields are empty");
            setFlag(true);
            return;
        }

        try {
            const res = await axios.post("/SignUp", formData);
            if (res.status === 201) {
                signUp(formData.username, formData.password, formData.instrument);
                setFormData(initialFormData);
                return navigate("/SignIn");
            }
        } catch (err) {
            handleErrors(err);
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
                }}
            >
                <Box sx={{ typography: 'subtitle2', fontSize: '30px', textAlign: 'center' }}>SignUp</Box>
                {flag && (
                    <div>
                        <br></br>
                        <br></br>{" "}
                        <Alert severity="error" sx={{ whiteSpace: "pre-line" }}>
                            {textErr}
                        </Alert>
                    </div>
                )}
                <TextField
                    name="username"
                    required
                    fullWidth //component will take up the full width of its container
                    id="userName"
                    label="username"
                    type="email"
                    autoFocus //the input element is focused during the first mount
                    placeholder="Enter your email"
                    error={userNameError}
                    value={formData.username}
                    onChange={handleChange}
                />
                <TextField
                    name="password"
                    required
                    fullWidth
                    id="userPassword"
                    label="password"
                    type="password"
                    autoComplete="password"
                    placeholder="Enter your password"
                    error={userPasswordError}
                    value={formData.password}
                    onChange={handleChange}
                />
                <FormControl fullWidth required>
                    <InputLabel>Instrument</InputLabel>
                    <Select
                        name="instrument"
                        value={formData.instrument}
                        label="instrument"
                        error={userInstrumentError}
                        onChange={handleChange}
                    >
                        <MenuItem value="Drums">Drums</MenuItem>
                        <MenuItem value="Guitars">Guitars</MenuItem>
                        <MenuItem value="Bass">Bass</MenuItem>
                        <MenuItem value="Saxophone">Saxophone</MenuItem>
                        <MenuItem value="Keyboards">Keyboards</MenuItem>
                        <MenuItem value="Vocals">Vocals</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >Create account</Button>
                <Link to="/SignIn" variant="body2">
                    Already have account? Click here and signIn
                </Link>
            </Box>
        </>
    )
}
export default SignUp;