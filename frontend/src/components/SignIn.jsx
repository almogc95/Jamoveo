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
import axios from '../axiosHTTPrequests';


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
        setFlag(true);
        setUserNameError(false);
        setUserPasswordError(false);

        if (err.response?.data && err.response?.data.errors) {
            const errors = err.response.data.errors;
            console.log(errors);
            let errMsg = "";

            if (errors.length > 1) {
                for (let error of errors) {
                    const errorMsg = error.msg;
                    if (error.param === "username") {
                        setUserNameError(true);
                        errMsg += `${errorMsg}\n`;
                    }
                    //password
                    else {
                        setUserPasswordError(true);
                        errMsg += `${errorMsg}\n`;
                    }
                }
            }
            else {
                if (errors[0].param === "username") {
                    setUserNameError(true);
                }
                //password
                else {
                    setUserPasswordError(true);
                }
                errMsg = errors[0].msg;
            }
            setText(errMsg);
        } else {
            setText("Oops! Something went wrong");
        }
    };

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

        if (!formData.username || !formData.password) {
            setText("Oops! Looks like some of the fields are empty");
            setFlag(true);
            return;
        }
        try {
            // const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/SignIn`, formData, {
            //     headers: { //try to fix CORS issue 
            //         'Content-Type': 'application/json',
            //         'Access-Control-Allow-Origin': 'https://jamoveo-backend-al1u.onrender.com/SignIn',
            //         withCredentials: true,
            //     },
            // }); //TODO

            let res;
            //check if the project is in version production or development
            process.env.NODE_ENV === 'production' ?
                res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/SignIn`, formData) :
                res = await axios.post(`/SignIn`, formData);
            if (res.data?.msg === "User does not exist") {
                setFlag(true);
                return setText("User does not exist");
            }
            else if (res.data?.msg === "Password does not match") {
                setFlag(true);
                return setText("Password does not match");
            }
            else {
                login(res.data?.username, res.data?.password, res.data?.instrument);
                setFormData(initialFormData);
                return navigate("/MainPagePlayer");
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