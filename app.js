const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiUserRoutes = require('./api_user');
const apiProductRoutes = require('./api_product');
const apiLocationRoutes = require('./api_location');
const apiUploadRoutes = require('./api_upload');
const connectDB = require('./mongodb');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3001;
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Welcome to the Express server!');
});

// Use external route files
app.use('/api_user', apiUserRoutes);
app.use('/api_product', apiProductRoutes);
app.use('/api_location', apiLocationRoutes);
app.use('/api_upload', apiUploadRoutes);

const uploadsProfile = path.join(__dirname, 'uploads/profile');
if (!fs.existsSync(uploadsProfile)) {
  fs.mkdirSync(uploadsProfile, { recursive: true }); 
}
app.use('/uploads/profile', express.static(path.join(__dirname, 'uploads/profile')));


// Start the server
app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server is successfully running, and App is listening on port ${PORT}`);
    } else {
        console.error('Error occurred, server can\'t start', error);
    }
});
