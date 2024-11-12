const express = require('express');
const router = express.Router();
const User = require('./models/user');
const { v4: uuidv4 } = require('uuid');

// Registration route
router.post('/userRegistration', async (req, res) => {
    const { name, number, email, dob, username, password, cpassword } = req.body;
    const role = "subscriber";
    const userId = uuidv4();
    if (!userId, !name || !number || !email || !dob || !role || !username || !password || !cpassword) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newUser = new User({ userId, name, number, email, dob, username, role, password, cpassword });
        await newUser.save();
        return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error inserting data:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Registration route
router.post('/adminRegistration', async (req, res) => {
    const { name, number, email, dob, role, username, password, cpassword } = req.body;
    const userId = uuidv4();
    if (!userId, !name || !number || !email || !dob || !role || !username || !password || !cpassword) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newUser = new User({userId, name, number, email, dob, role, username, role, password, cpassword });
        await newUser.save();
        return res.status(200).json({ message: `${role} registered successfully` });
    } catch (error) {
        console.error('Error inserting data:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Username verification route
router.post('/userVerification', async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(200).json({ message: 'Username is available' });
        } else {
            return res.status(401).json({ message: 'Username not available' });
        }
    } catch (error) {
        console.error('Error querying database:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Login route
router.post('/userLogin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [
                { username: username },
                { email: username } 
            ]
        });
        if (!user) {
            return res.status(401).json({ message: 'Username or password is incorrect' });
        }

        if (password === user.password) {
            return res.status(200).json({ message: 'Login successful', user: user });
        } else {
            return res.status(401).json({ message: 'Username or password is incorrect' });
        }
    } catch (error) {
        console.error('Error querying database:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    
});
router.put('/updateProfile', async (req, res) => {
    try {
        const { userId, password, cpassword, country, state, city, address } = req.body;

        // Ensure required fields are provided
        if (!userId || !password || !cpassword || !country || !state || !city || !address) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Update user in the database
        const updatedUser = await User.findOneAndUpdate(
            { userId }, // Find by userId
            { password, cpassword, country, state, city, address }, // Fields to update
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({ message: 'Profile updated successfully', updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
git 
module.exports = router;
