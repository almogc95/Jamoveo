import { body } from 'express-validator';

export const validate = (method) => {
    switch (method) {
        case "handleSignUp": {
            return [
                body("username")
                    .not()
                    .isEmpty()
                    .withMessage("Oops! looks like you forgot to enter an email address")
                    .isEmail()
                    .withMessage("Oops! Invalid email address")
                    .normalizeEmail(),
                body("password")
                    .not()
                    .isEmpty()
                    .withMessage("Oops! looks like you forgot to enter password")
                    .trim()
                    .escape()
                    .isLength({ min: 4, max: 10 })
                    .withMessage("Password should contain between 4 and 10 characters"),
                body("instrument")
                    .not()
                    .isEmpty()
                    .withMessage("Instrument field is required")
                    .isIn(["Drums", "Guitars", "Bass", "Saxophone", "Keyboards", "Vocals"])
                    .withMessage("Invalid instrument selected"),
            ];
        }
        case "handleSignIn": {
            return [
                body("username")
                    .not()
                    .isEmpty()
                    .withMessage("Oops! looks like you forgot to enter an email address")
                    .isEmail()
                    .withMessage("Oops! Invalid email address")
                    .normalizeEmail(),
                body("password")
                    .not()
                    .isEmpty()
                    .withMessage("Oops! looks like you forgot to enter password")
                    .trim()
                    .escape()
                    .isLength({ min: 4, max: 10 })
                    .withMessage("Password should contain between 4 and 10 characters"),
            ];
        }
        case "handleSignUpAdmin": {
            return [
                body("adminname")
                    .not()
                    .isEmpty()
                    .withMessage("Oops! looks like you forgot to enter an email address")
                    .isEmail()
                    .withMessage("Oops! Invalid email address")
                    .normalizeEmail(),
                body("adminpassword")
                    .not()
                    .isEmpty()
                    .withMessage("Oops! looks like you forgot to enter password")
                    .trim()
                    .escape()
                    .isLength({ min: 4, max: 10 })
                    .withMessage("Password should contain between 4 and 10 characters"),
            ];
        }
        case "handleSignInAdmin": {
            return [
                body("adminname")
                    .not()
                    .isEmpty()
                    .withMessage("Oops! looks like you forgot to enter an email address")
                    .isEmail()
                    .withMessage("Oops! Invalid email address")
                    .normalizeEmail(),
                body("adminpassword")
                    .not()
                    .isEmpty()
                    .withMessage("Oops! looks like you forgot to enter password")
                    .trim()
                    .escape()
                    .isLength({ min: 4, max: 10 })
                    .withMessage("Password should contain between 4 and 10 characters"),
            ];
        }
    }
};