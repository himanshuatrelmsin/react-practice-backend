const express = require('express');
const router = express.Router();

const Product = require('./models/product');

// Registration route
router.post('/addProduct', async (req, res) => {
    const {
        title,
        image,
        location,
        ex_showroom_price,
        registration_price,
        insurance_price,
        other_charges,
        total_price,
        subsidy_price,
        color_code,
        waiting_period,
        launch_date,
        vehicle_type,
        count,
        slug,
        waiting_period_type,
        metaDescription,
        metaTitle,
        description,
        companyData,
        variantData
    } = req.body;
    
    if (!title || !ex_showroom_price || !total_price || !vehicle_type || !slug) {
        return res.status(400).json({ message: 'Title, ex_showroom_price, total_price, vehicle_type, and slug are required.' });
    }

    try {
        const newProduct = new Product({
            title,
            image,
            location,
            ex_showroom_price,
            registration_price,
            insurance_price,
            other_charges,
            total_price,
            subsidy_price,
            color_code,
            waiting_period,
            launch_date,
            vehicle_type,
            count,
            slug,
            waiting_period_type,
            metaDescription,
            metaTitle,
            description,
            companyData,
            variantData
        });
        await newProduct.save();
        return res.status(200).json({ message: 'Prduct added successfully' });
    } catch (error) {
        console.error('Error inserting data:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
