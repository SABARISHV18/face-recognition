








  
// const video = document.getElementById("video");

// Promise.all([
//   faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
//   faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
//   faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
// ]).then(startWebcam);

// function startWebcam() {
//   navigator.mediaDevices
//     .getUserMedia({
//       video: true,
//       audio: false,
//     })
//     .then((stream) => {
//       video.srcObject = stream;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

// function getLabeledFaceDescriptions() {
//   const labels = ["Messi"];
//   return Promise.all(
//     labels.map(async (label) => {
//       const descriptions = [];
//       for (let i = 1; i <= 2; i++) {
//         const img = await faceapi.fetchImage(`./labels/${label}/${i}.png`);
//         const detections = await faceapi
//           .detectSingleFace(img)
//           .withFaceLandmarks()
//           .withFaceDescriptor();
//         descriptions.push(detections.descriptor);
//       }
//       return new faceapi.LabeledFaceDescriptors(label, descriptions);
//     })
//   );
// }

// video.addEventListener("play", async () => {
//   const labeledFaceDescriptors = await getLabeledFaceDescriptions();
//   const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

//   const canvas = faceapi.createCanvasFromMedia(video);
//   document.body.append(canvas);

//   const displaySize = { width: video.width, height: video.height };
//   faceapi.matchDimensions(canvas, displaySize);

//   setInterval(async () => {
//     const detections = await faceapi
//       .detectAllFaces(video)
//       .withFaceLandmarks()
//       .withFaceDescriptors();

//     const resizedDetections = faceapi.resizeResults(detections, displaySize);

//     canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//     const results = resizedDetections.map((d) => {
//       return faceMatcher.findBestMatch(d.descriptor);
//     });
//     console.log(results);
//     results.forEach((result, i) => {
//       const box = resizedDetections[i].detection.box;
//       const drawBox = new faceapi.draw.DrawBox(box, {
//         label: result,
        
//       });
//       drawBox.draw(canvas);
//     });
//   }, 100);
// });
// const { MongoClient } = require('mongodb');

// // MongoDB connection URL
// const mongoURI = 'mongodb://localhost:27017';
// // Database Name
// const dbName = 'yourDatabaseName';

// let db;

// // Connect to MongoDB
// MongoClient.connect(mongoURI, { useUnifiedTopology: true }, (err, client) => {
//   if (err) {
//     console.error('Failed to connect to MongoDB', err);
//     return;
//   }
//   console.log('Connected to MongoDB');
//   db = client.db(dbName);
// });

// // Function to insert attendance data into MongoDB
// async function insertAttendanceData(data) {
//   const collection = db.collection('attendance');
//   try {
//     await collection.insertMany(data);
//     console.log('Attendance data inserted into MongoDB');
//   } catch (err) {
//     console.error('Error inserting data into MongoDB', err);
//   }
// }









// const video = document.getElementById("video");

// Promise.all([
//   faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
//   faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
//   faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
// ]).then(startWebcam);

// function startWebcam() {
//   navigator.mediaDevices
//     .getUserMedia({
//       video: true,
//       audio: false,
//     })
//     .then((stream) => {
//       video.srcObject = stream;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

// function getLabeledFaceDescriptions() {
//   const labels = ["Messi","prathiish","ram","sabarish"];
//   return Promise.all(   
//     labels.map(async (label) => {
//       const descriptions = [];
//       for (let i = 1; i <= 2; i++) {
//         const img = await faceapi.fetchImage(`./labels/${label}/${i}.png`);
//         const detections = await faceapi
//           .detectSingleFace(img)
//           .withFaceLandmarks()
//           .withFaceDescriptor();
//         descriptions.push(detections.descriptor);
//       }
//       return new faceapi.LabeledFaceDescriptors(label, descriptions);
//     })
//   );
// }

// let workbook;
// let worksheet;
// let excelData = [];

// function initializeWorkbook() {
//   workbook = XLSX.utils.book_new();
//   worksheet = XLSX.utils.aoa_to_sheet([['Date', 'Time', 'Label', 'Attendance']]);
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
// }

// function appendDataToWorkbook(data) {
//   const currentDate = new Date();
//   const formattedDate = currentDate.toLocaleDateString();
//   const formattedTime = currentDate.toLocaleTimeString();
//   const newData = data.map((item) => {
//     return [formattedDate, formattedTime, item.label, item.attendance];
//   });

//   // Filter out duplicate rows based on label and attendance
//   const uniqueData = newData.filter((row) => {
//     const label = row[2]; // Index 2 is for label
//     const attendance = row[3]; // Index 3 is for attendance
//     return !excelData.some((existingRow) => {
//       return existingRow[2] === label && existingRow[3] === attendance;
//     });
//   });

//   // Append unique data to the workbook
//   XLSX.utils.sheet_add_aoa(worksheet, uniqueData, { origin: -1 });

//   // Update excelData with the new data
//   excelData.push(...uniqueData);
// }
// function downloadWorkbook() {
//   const excelFileName = 'attendance.xlsx';
//   XLSX.writeFile(workbook, excelFileName);
//   console.log(`Attendance saved to ${excelFileName}`);
// }

// // Call initializeWorkbook when the page is loaded
// initializeWorkbook();

// video.addEventListener("play", async () => {
//   const labeledFaceDescriptors = await getLabeledFaceDescriptions();
//   const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

//   const canvas = faceapi.createCanvasFromMedia(video);
//   document.body.append(canvas);

//   const displaySize = { width: video.width, height: video.height };
//   faceapi.matchDimensions(canvas, displaySize);
 
//   setInterval(async () => {
//     const detections = await faceapi
//       .detectAllFaces(video)
//       .withFaceLandmarks()
//       .withFaceDescriptors();

//     const resizedDetections = faceapi.resizeResults(detections, displaySize);

//     canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//     const results = resizedDetections.map((d) => {
//       return faceMatcher.findBestMatch(d.descriptor);
//     });
//     console.log(results);
//     results.forEach((result, i) => {
//       const box = resizedDetections[i].detection.box;
//       const drawBox = new faceapi.draw.DrawBox(box, {
//         label: result,
//       });
//       drawBox.draw(canvas);
//     });
//     const newData = [];
//     results.forEach((result) => {
//       const label = result._label;
//       const attendance = label === 'unknown' ? 'Absent' : 'Present';
//       newData.push({label, attendance});
//     });
//     // Append new data to the workbook
//   appendDataToWorkbook(newData);
//   // appendDataToMongo(newData);

//   }, 100);
//   setTimeout(downloadWorkbook, 20000)
// });
// // function appendDataToMongo(data) {
// //   insertAttendanceData(data);
// // }




const video = document.getElementById("video");

Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
]).then(startWebcam);

function startWebcam() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((error) => {
      console.error(error);
    });
}
function updateTable(data) {
  const tableBody = document.querySelector('#attendance-table tbody');
  
  // Clear existing table rows
  tableBody.innerHTML = '';

  // Iterate over the data and create table rows
  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.date}</td>
      <td>${item.time}</td>
      <td>${item.label}</td>
      <td>${item.attendance}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Example usage:
// updateTable([{ date: '2024-05-05', time: '09:00', label: 'John Doe', attendance: 'Present' }]);
function getLabeledFaceDescriptions() {
  const labels = ["Messi","prathiish","ram","sabarish"];
  return Promise.all(   
    labels.map(async (label) => {
      const descriptions = [];
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`./labels/${label}/${i}.png`);
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}

let workbook;
let worksheet;
let excelData = [];

function initializeWorkbook() {
  workbook = XLSX.utils.book_new();
  worksheet = XLSX.utils.aoa_to_sheet([['Date', 'Time', 'Label', 'Attendance']]);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
}

function appendDataToWorkbook(data) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();
  const newData = data.map((item) => {
    return [formattedDate, formattedTime, item.label, item.attendance];
  });

  // Filter out duplicate rows based on label and attendance
  const uniqueData = newData.filter((row) => {
    const label = row[2]; // Index 2 is for label
    const attendance = row[3]; // Index 3 is for attendance
    return !excelData.some((existingRow) => {
      return existingRow[2] === label && existingRow[3] === attendance;
    });
  });

  // Append unique data to the workbook
  XLSX.utils.sheet_add_aoa(worksheet, uniqueData, { origin: -1 });

  // Update excelData with the new data
  excelData.push(...uniqueData);

  // Send the new data to the other project
  sendDataToOtherProject(uniqueData);
}

function downloadWorkbook() {
  const excelFileName = 'attendance.xlsx';
  XLSX.writeFile(workbook, excelFileName);
  console.log(`Attendance saved to ${excelFileName}`);
}

// Call initializeWorkbook when the page is loaded
initializeWorkbook();

video.addEventListener("play", async () => {
  const labeledFaceDescriptors = await getLabeledFaceDescriptions();
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);

  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
 
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video)
      .withFaceLandmarks()
      .withFaceDescriptors();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    const results = resizedDetections.map((d) => {
      return faceMatcher.findBestMatch(d.descriptor);
    });
    
    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: result,
      });
      drawBox.draw(canvas);
    });
    
    const newData = results.map((result) => {
      const label = result._label;
      const attendance = label === 'unknown' ? 'Absent' : 'Present';
      return { label, attendance };
    });
    
    // Append new data to the workbook
    appendDataToWorkbook(newData);
    
  }, 100);
  setTimeout(downloadWorkbook, 20000)
  updateTable([{ date: '2024-05-05', time: '09:00', label: 'John Doe', attendance: 'Present' }]);

});

// Define the event listener before sending any messages
window.addEventListener('message', (event) => {
  if (event.origin === targetOrigin && event.data.type === 'dataReceived') {
    alert('Data successfully sent to the other project!');
  }
});

function sendDataToOtherProject(data) {
  // Target origin is the URL of the other project
  const targetOrigin = 'http://localhost:5173/dashboard/json';

  // Send data to the other project
  window.postMessage({ type: 'excelData', data }, targetOrigin);
}

// Call sendDataToOtherProject when needed
// For example:
// sendDataToOtherProject(uniqueData);
