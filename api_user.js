const express = require('express');
const router = express.Router();

const User = require('./models/user');

// Registration route
router.post('/userRegistration', async (req, res) => {
    const { name, number, email, dob, username, password, cpassword } = req.body;
    const role = "subscriber";
    if (!name || !number || !email || !dob || !role || !username || !password || !cpassword) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newUser = new User({ name, number, email, dob, username, role, password, cpassword });
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
  
    if (!name || !number || !email || !dob || !role || !username || !password || !cpassword) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newUser = new User({ name, number, email, dob, role, username, role, password, cpassword });
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
            return res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email } });
        } else {
            return res.status(401).json({ message: 'Username or password is incorrect' });
        }
    } catch (error) {
        console.error('Error querying database:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    
});


router.post('/changePassword', async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }
        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

        user.password = hashedNewPassword;
        await user.save();

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/requestPassword', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = jwt.sign({ email: user.email }, 'your-secret-key', { expiresIn: '1h' });
        const resetUrl = `http://localhost:3001/reset-password?token=${resetToken}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'himanshuatre.lmsin@gmail.com',
                pass: 'slrtzujguwvqklvl',
            },
        });

        const mailOptions = {
            from: 'himanshuatre.lmsin@gmail.com',
            to: user.email,
            subject: 'Password Reset Request',
            text: `To reset your password, please click the following link: ${resetUrl}`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/allUsers', async (req, res) => {
    try {
        const users = await User.find({ role: 'subscriber' }); // Retrieves all users
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
