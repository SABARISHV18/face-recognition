const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for enabling CORS
app.use(cors());

// Connect to MongoDB
// mongodb://localhost/sabari
mongoose.connect('mongodb+srv://sabarishv:Sabarii8@cluster0.ft5iy6n.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Define a schema for the Excel data
const excelSchema = new mongoose.Schema({
  label: String,
  attendance: String
}, { timestamps: true });

// Create a model based on the schema
const ExcelData = mongoose.model('ExcelData', excelSchema);

// Middleware for parsing JSON
app.use(bodyParser.json());



app.post('/api/data', async (req, res) => {
  try {
    console.log('Data received:', req.body);
    // Extract the object from the array
    const data = req.body[0];
    console.log('Data to be saved:', data); // Log the data before saving
    const newExcelData = new ExcelData(data);
    await newExcelData.save();
    console.log('Data saved successfully');
    res.status(200).send('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data');
  }
});
// app.post('/api/data', async (req, res) => {
//   try {
//     console.log('Data received:', req.body);
//     // Extract the object from the array
//     const data = req.body[0];

//     // Check if attendance data for the same label already exists for today
//     const existingData = await ExcelData.findOne({
//       label: data.label,
//       createdAt: {
//         $gte: new Date(new Date().setHours(0, 0, 0)), // Today's date
//         $lt: new Date(new Date().setHours(23, 59, 59)), // End of today
//       },
//     });

//     if (existingData) {
//       // Attendance data already exists for this label today
//       console.log('Attendance already marked for today');
//       return res.status(400).send('Attendance already marked for today');
//     }

//     // Attendance data does not exist for this label today, proceed to save
//     console.log('Data to be saved:', data);
//     const newExcelData = new ExcelData(data);
//     await newExcelData.save();
//     console.log('Data saved successfully');
//     return res.status(200).send('Data saved successfully');
//   } catch (error) {
//     console.error('Error saving data:', error);
//     return res.status(500).send('Error saving data');
//   }
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
