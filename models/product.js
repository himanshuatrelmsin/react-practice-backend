// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: [{ type: String }], // Array of image URLs
    location: [
        {
            state: { type: mongoose.Schema.Types.ObjectId, ref: 'State' },
            cities: [
                {
                    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' }
                }
            ]
        }
    ],
    ex_showroom_price: { type: Number, required: true },
    registration_price: { type: Number, default: 0 },
    insurance_price: { type: Number, default: 0 },
    other_charges: { type: Number, default: 0 },
    total_price: { type: Number, required: true },
    subsidy_price: { type: Number, default: 0 },
    color_code: { type: String, default: '1' },
    waiting_period: { type: Number, default: 0 },
    launch_date: { type: Date },
    vehicle_type: { type: Number, required: true },
    count: { type: Number, default: 0 },
    slug: { type: String, required: true },
    waiting_period_type: { type: Number, default: 1 },
    metaDescription: { type: String },
    metaTitle: { type: String },
    description: { type: String },
    companyData: {
        _id: { type: mongoose.Schema.Types.ObjectId },
        title: { type: String, required: true },
        slug: { type: String, required: true },
        vehicle_prefix: { type: String }
    },
    variantData: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId },
            parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
            title: { type: String, required: true },
            image: { type: String, required: true },
            location: [{ state: { type: mongoose.Schema.Types.ObjectId, ref: 'State' }, cities: [{ city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' } }] }],
            pin_code: { type: String },
            ex_showroom_price: { type: Number, required: true },
            registration_price: { type: Number, default: 0 },
            insurance_price: { type: Number, default: 0 },
            other_charges: { type: Number, default: 0 },
            total_price: { type: Number, required: true },
            subsidy_price: { type: Number, default: 0 },
            color_code: { type: String, default: '1' },
            waiting_period: { type: Number, default: 0 },
            launch_date: { type: Date },
            vehicle_type: { type: Number, required: true },
            count: { type: Number, default: 0 },
            slug: { type: String, required: true },
            flag: { type: Number },
            waiting_period_type: { type: Number, default: 1 },
            vehicleSubType: { type: Number },
            rtoRegistration: { type: Boolean, default: true },
            topten: { type: Number },
            company_title: { type: String },
            inquiriesCount: { type: Number, default: 0 },
            description: { type: String },
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now }
        }
    ]
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
