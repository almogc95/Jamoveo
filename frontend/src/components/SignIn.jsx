//import from react
import { useState, useContext } from 'react';

//import react-router-dom
import { Link, useNavigate } from 'react-router-dom';

//import libraries from material-ui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

//import components
import { AuthContext } from '../../src/context/AuthContext';

//import axios
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8080/';


const SignIn = () => {
    const initialFormData = {
        username: "",
        password: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const { login } = useContext(AuthContext);
    const [userNameError, setUserNameError] = useState(false);
    const [userPasswordError, setUserPasswordError] = useState(false);
    const [textErr, setText] = useState("");
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();

    const handleErrors = (err) => {
        setUserNameError(false);
        setUserPasswordError(false);

        if (err.response?.data) {
            // Check if there are validation errors
            if (err.response.data.errors) {
                const errors = err.response.data.errors;
                let errMsg = "";

                errors.forEach(error => {
                    if (error.param === "username") {
                        setUserNameError(true);
                    } else if (error.param === "password") {
                        setUserPasswordError(true);
                    }
                    errMsg += `${error.msg}\n`; // Accumulate error messages
                });

                setText(errMsg);
            } else {
                // Handle other types of errors
                setText(err.response.data.msg || "Oops! Something went wrong"); // Ensure proper messaging
            }
            setFlag(true); // Show the alert
        } else {
            setText("Oops! Something went wrong");
            setFlag(true);
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,

        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserNameError(!formData.username);
        setUserPasswordError(!formData.password);
        try {
            const res = await axios.post("/SignIn", formData);
            if (res.status === 201) {
                login(res.data?.username, res.data?.password, res.data?.instrument);
                setFormData(initialFormData);
                return navigate("/MainPagePlayer")
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
                <Box sx={{ typography: 'subtitle2', fontSize: '30px', textAlign: 'center' }}>SignIn</Box>
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
                    label="Username"
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
                    label="Password"
                    type="password"
                    autoComplete="password"
                    placeholder="Enter your password"
                    error={userPasswordError}
                    value={formData.password}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >Start play!</Button>
                <Link to="/SignUp" variant="body2">
                    Don't have an account? Click here and signUp
                </Link>
            </Box>
        </>
    )
}
export default SignIn;