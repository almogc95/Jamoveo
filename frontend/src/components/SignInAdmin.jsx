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
import { AuthContextAdmin } from '../../src/context/AuthContextAdmin';

//import axios
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8080/';

const SignInAdmin = () => {
    const initialFormData = {
        adminname: "",
        adminpassword: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const { adminLogin } = useContext(AuthContextAdmin);
    const [adminNameError, setAdminNameError] = useState(false);
    const [adminPasswordError, setAdminPasswordError] = useState(false);
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
        setAdminNameError(false);
        setAdminPasswordError(false);

        if (err.response?.data && err.response?.data.errors) {
            //handle validation errors
            const errors = err.response.data.errors;
            let errMsg = "";

            errors.forEach(error => {
                if (error.param === "adminname") {
                    setAdminNameError(true);
                } else if (error.param === "adminpassword") {
                    setAdminPasswordError(true);
                }
                errMsg += `${error.msg}\n`;
            });

            setText(errMsg);
            setFlag(true); //show the alert
        }
        else {
            setText("Oops! Something went wrong");
            setFlag(true);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setAdminNameError(!formData.adminname);
        setAdminPasswordError(!formData.adminpassword);

        if (!formData.adminname || !formData.adminpassword) {
            setText("Oops! Looks like some of the fields are empty");
            setFlag(true);
            return;
        }

        try {
            const res = await axios.post("/SignInAdmin", formData);
            if (res.status === 201) {
                adminLogin(res.data?.adminname, res.data?.adminpassword);
                setFormData(initialFormData);
                return navigate("/MainPageAdmin")
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
                <Box sx={{ typography: 'subtitle2', fontSize: '30px', textAlign: 'center' }}>SignIn Admin</Box>
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
                    name="adminname"
                    required
                    fullWidth //component will take up the full width of its container
                    id="adminName"
                    label="adminname"
                    type="email"
                    autoFocus //the input element is focused during the first mount
                    placeholder="Enter your email"
                    error={adminNameError}
                    value={formData.adminname}
                    onChange={handleChange}
                />
                <TextField
                    name="adminpassword"
                    required
                    fullWidth
                    id="adminPassword"
                    label="adminpassword"
                    type="password"
                    autoComplete="adminpassword"
                    placeholder="Enter your password"
                    error={adminPasswordError}
                    value={formData.password}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >Start play!</Button>
                <Link to="/SignUpAdmin" variant="body2">
                    Don't have an admin account? Click here and signUp
                </Link>
            </Box>
        </>
    )
}
export default SignInAdmin;