import mongoose from "mongoose";
import { user_schema } from "../models/user_details.js";
import { admin_schema } from "../models/admin_details.js";
import { validationResult } from "express-validator";

// Import JSON files
import heyJudeLyrics from "../data/hey_jude.json" assert { type: 'json' };
import veechSheloLyrics from "../data/veech_shelo.json" assert { type: 'json' };


const UserModel = mongoose.model('user_details', user_schema);
const AdminModel = mongoose.model('admin_details', admin_schema);

//use hard-code data
const songs = [
    { songId: 1, songName: 'Hey jude', songArtist: 'The Beatles', songImage: 'public/hey_judeImage.png', songLyrics: heyJudeLyrics },
    { songId: 2, songName: 'ואיך שלא', songArtist: 'אריאל זילבר', songImage: 'public/veech_shelo.jpg', songLyrics: veechSheloLyrics },
    { songId: 3, songName: 'רבות הדרכים', songArtist: 'דניאל סולמון', songLyrics: veechSheloLyrics }, //add this to large the data
    { songId: 4, songName: 'אני חוזר', songArtist: 'דולי ופן', songLyrics: veechSheloLyrics }, //add this to large the data
    { songId: 5, songName: 'Hotel California', songArtist: 'Eagles', songLyrics: veechSheloLyrics }, //add this to large the data
];

// SignUp user
export const handleSignUp = async (req, res) => {
    //check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return validation errors
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, instrument } = req.body;
    console.log(req.body);
    try {
        // Check for missing fields
        if (!username || !password || !instrument) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        // Check if user already exists
        let user = await UserModel.findOne({ username });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user
        const newUser = new UserModel({
            userName: username,
            userPassword: password,
            userInstrument: instrument,
        });
        console.log(newUser);
        await newUser.save(); // Save user to the database

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        if (error.code === 11000) { //mongoDB duplicate key error code
            return res.status(400).json({ msg: 'User already exists with this email' });
        }
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

//SignIn user
export const handleSignIn = async (req, res) => {
    //check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return validation errors
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
        // Check for missing fields
        if (!username || !password) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        // Check if user exists 
        const user = await UserModel.findOne({ userName: username });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        //Check if password correct
        if (password !== user.userPassword) {
            return res.status(400).json({ msg: 'Password does not match' });
        }

        res.status(201).json({
            msg: 'User exists, redirects to the home page',
            username: user.userName,
            password: user.userPassword,
            instrument: user.userInstrument,
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

//SignUp admin
export const handleSignUpAdmin = async (req, res) => {
    //check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return validation errors
        return res.status(400).json({ errors: errors.array() });
    }

    const { adminname, adminpassword } = req.body;

    try {
        //check for missing fields
        if (!adminname || !adminpassword) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        //check if user already exists
        const admin = await AdminModel.findOne({ adminname });

        if (admin) {
            return res.status(400).json({ msg: 'Admin already exists' });
        }

        // Create new user
        const newAdmin = new AdminModel({
            adminName: adminname,
            adminPassword: adminpassword,
        });
        console.log(newAdmin);
        await newAdmin.save(); //save user to the database

        res.status(201).json({ msg: 'Admin registered successfully' });
    } catch (error) {
        if (error.code === 11000) { //mongoDB duplicate key error code
            return res.status(400).json({ msg: 'Admin already exists with this email' });
        }
        res.status(500).send('Server Error');
    }
};

//SignIn admin
export const handleSignInAdmin = async (req, res) => {
    //check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return validation errors
        return res.status(400).json({ errors: errors.array() });
    }

    const { adminname, adminpassword } = req.body;
    try {
        //check for missing fields
        if (!adminname || !adminpassword) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        //check if admin exists 
        const admin = await AdminModel.findOne({ adminName: adminname });
        if (!admin) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        //Check if password correct
        if (adminpassword !== admin.adminPassword) {
            return res.status(400).json({ msg: 'Password does not match' });
        }

        res.status(201).json({
            msg: 'Admin exists, redirects to the home page',
            adminname: admin.adminName,
            adminpassword: admin.adminPassword,
            adminrole: admin.adminRole,
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

//ResultsPageAdmin
export const handleResultsPageAdmin = async (req, res) => {
    const songQuery = req.query?.song;  // Accessing query parameter
    console.log("Search Query from frontend:", songQuery);

    // Filter songs based on the query
    const filteredSongs = songs.filter(song =>
        song.songName.toLowerCase().includes(songQuery.toLowerCase()) ||
        song.songArtist.toLowerCase().includes(songQuery.toLowerCase())
    );

    // Send filtered results to the frontend
    res.json(filteredSongs);
};

//LivePage
export const handleLivePage = async (req, res) => {
    const songId = parseInt(req.params.songId, 10);
    const song = songs.find(s => s.songId === songId); // Find the song in the array

    if (song) {
        res.json(song); // Send the song data as a response
    } else {
        res.status(404).json({ message: 'Song not found' });
    }
};