const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const app = express();

// Set up multer for handling form-data
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For URL-encoded form data

// Path to the Excel file
const filePath = path.join(__dirname, 'form-submissions.xlsx');

// Create or read the Excel file
const createOrReadExcelFile = () => {
  if (fs.existsSync(filePath)) {
    // File exists, read it
    return XLSX.readFile(filePath);
  } else {
    // File does not exist, create a new workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([['Full Name', 'Email', 'Message']]);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');
    XLSX.writeFile(workbook, filePath);
    return workbook;
  }
};

// Handle form submission
app.post('/contact', upload.none(), (req, res) => {
  const { fullname, email, message } = req.body;

  // Create or read the existing Excel file
  const workbook = createOrReadExcelFile();
  const worksheet = workbook.Sheets['Submissions'];

  // Add form data to the worksheet
  const data = [
    [fullname, email, message]
  ];
  const range = XLSX.utils.decode_range(worksheet['!ref']);
  const startRow = range.e.r + 1;
  XLSX.utils.sheet_add_aoa(worksheet, data, { origin: A${startRow + 1} });

  // Write the updated workbook to file
  XLSX.writeFile(workbook, filePath);

  // Print the form data to the console
  console.log(Received form submission:);
  console.log(Full Name: ${fullname});
  console.log(Email: ${email});
  console.log(Message: ${message});

  // Return a success response
  res.json({ message: 'Form submitted successfully!' });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});