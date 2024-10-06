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
import axios from '../axiosHTTPrequests';

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
        setFlag(true);
        setAdminNameError(false);
        setAdminPasswordError(false);

        if (err.response?.data && err.response?.data.errors) {
            const errors = err.response.data.errors;
            console.log(errors);
            let errMsg = "";

            if (errors.length > 1) {
                for (let error of errors) {
                    const errorMsg = error.msg;
                    if (error.param === "adminname") {
                        setAdminNameError(true);
                        errMsg += `${errorMsg}\n`;
                    }
                    //password
                    else {
                        setAdminPasswordError(true);
                        errMsg += `${errorMsg}\n`;
                    }
                }
            }
            else {
                if (errors[0].param === "adminname") {
                    setAdminNameError(true);
                }
                //password
                else {
                    setAdminPasswordError(true);
                }
                errMsg = errors[0].msg;
            }
            setText(errMsg);
        } else {
            setText("Oops! Something went wrong");
        }
    };


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
            let res;
            //check if the project is in version production or development
            process.env.PROJECT_MODE === 'production' ?
                res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/SignInAdmin`, formData) :
                res = await axios.post(`/SignInAdmin`, formData);

            if (res.data?.msg === "Admin does not exist") {
                setFlag(true);
                return setText("Admin does not exist");
            }
            else if (res.data?.msg === "Password does not match") {
                setFlag(true);
                return setText("Password does not match");
            }
            else {
                adminLogin(res.data?.adminname, res.data?.adminpassword);
                setFormData(initialFormData);
                return navigate("/MainPageAdmin");
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