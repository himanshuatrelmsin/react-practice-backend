const express = require('express');
const router = express.Router();

const Location = require('./models/location');

// Registration route
router.post('/userLocation', async (req, res) => {
    const {fname, lname, company_name, country, state, city, street_address1, street_address2, pincode, email, phone, default_address } = req.body;
    const userId = localStorage.getItem('userId');
    // const userId = "6f487228-9b78-4946-a784-5554882016ff";
    if (!userId, !fname || !lname || !country || !state || !city || !street_address1 || !pincode || !email || !phone) {
        return res.status(400).json({ message: 'Please fill required fields.' });
    }
    
    try {
        const newLocation = new Location({ userId, fname, lname, company_name, country, state, city, street_address1, street_address2, pincode, email, phone, default_address });
        await newLocation.save();
        return res.status(200).json({ message: 'Location added successfully' });
    } catch (error) {
        console.error('Error inserting data:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;