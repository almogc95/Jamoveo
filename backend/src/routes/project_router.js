import express from "express";
const router = express.Router();

//import handeles
import { handleSignUp, handleSignIn, handleSignUpAdmin, handleSignInAdmin, handleResultsPageAdmin, handleLivePage } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validator.middleware.js";

router.post('/SignUp', validate('handleSignUp'), handleSignUp);

router.post('/SignIn', validate('handleSignIn'), handleSignIn);

router.post('/SignUpAdmin', validate('handleSignUpAdmin'), handleSignUpAdmin);

router.post('/SignInAdmin', validate('handleSignInAdmin'), handleSignInAdmin);

router.get('/ResultsPageAdmin', handleResultsPageAdmin);

router.get('/LivePage/:songId', handleLivePage);

export default router;