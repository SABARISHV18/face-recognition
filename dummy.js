// const video = document.getElementById("video");
// let todayNames = []; // Store names for the current day

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
// let previousData = [];

// function initializeWorkbook() {
//   // Load previous data if available
//   const previousDataJson = localStorage.getItem('previousData');
//   if (previousDataJson) {
//     previousData = JSON.parse(previousDataJson);
//     excelData.push(...previousData);
//   }

//   workbook = XLSX.utils.book_new();
//   worksheet = XLSX.utils.aoa_to_sheet([['Date', 'Time', 'Label', 'Attendance']]);
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
// }

// function appendDataToWorkbook(data) {
//   const currentDate = new Date();
//   const formattedDate = currentDate.toLocaleDateString();
//   const formattedTime = currentDate.toLocaleTimeString();

//   const existingLabels = excelData.map((entry) => entry[2]); // Extract existing labels

//   const uniqueData = data.filter((entry) => {
//     const [date, label] = [formattedDate, entry.label];
//     return !existingLabels.includes(label); // Check if label already exists for today's date
//   });

//   // Format unique data with timestamp
//   const formattedUniqueData = uniqueData.map((item) => [
//     formattedDate,
//     formattedTime,
//     item.label,
//     item.attendance,
//     currentDate.getTime(), // Include timestamp
//   ]);

//   // Update excelData with the new data
//   excelData.push(...formattedUniqueData);

//   // Update worksheet with the updated data
//   const updatedData = excelData.concat(previousData); // Combine with previous data
//   XLSX.utils.sheet_add_aoa(worksheet, updatedData, { origin: -1 });

//   // Save data locally for future use
//   saveDataLocally();

//   // Update todayNames with new names recorded today
//   todayNames = todayNames.concat(uniqueData.map((item) => item.label));
// }

// // Function to update the HTML table with attendance data
// function updateTable(data) {
//   const tableBody = document.querySelector('#attendance-table tbody');
  
//   // Clear existing table rows
//   tableBody.innerHTML = '';

//   // Iterate over the data and create table rows
//   data.forEach(item => {
//     const row = document.createElement('tr');
//     row.innerHTML = `
//       <td>${item.date}</td>
//       <td>${item.time}</td>
//       <td>${item.label}</td>
//       <td>${item.attendance}</td>
//     `;
//     tableBody.appendChild(row);
//   });
// }

// // Example usage:
// // updateTable([{ date: '2024-05-05', time: '09:00', label: 'John Doe', attendance: 'Present' }]);


// function saveDataLocally() {
//   // localStorage.setItem('previousData', JSON.stringify(excelData));
//   localStorage.clear();

// }

// function downloadWorkbook() {
//   const currentDate = new Date();
//   const day = currentDate.getDate();
//   const month = currentDate.getMonth() + 1;
//   const year = currentDate.getFullYear();
//   const filename = `attendance_${year}${month}${day}.xlsx`;

//   XLSX.writeFile(workbook, filename);
//   console.log(`Attendance saved to ${filename}`);
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
//     appendDataToWorkbook(newData);
//     updateTable(newData);
//   }, 100);
  
//   // Download workbook after 20 seconds
//   setTimeout(downloadWorkbook, 10000);
// });
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

document.getElementById('saveButton').addEventListener('click', async () => {
  const tableRows = document.querySelectorAll('#attendance-table tbody tr');
  const data = Array.from(tableRows).map(row => ({
    label: row.cells[0].textContent,
    attendance: row.cells[1].textContent
  }));
  console.log('Data to be sent:', data);
  try {
    await fetch('https://face-detect-backend-6m5kpog4v-sabarishs-projects-09ce967f.vercel.app/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    console.log('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
  }
});

function updateTable(data) {
  const tableBody = document.querySelector('#attendance-table tbody');
  
  // Clear existing table rows
  tableBody.innerHTML = '';

  // Iterate over the data and create table rows
  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
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

function appendDataToWorkbook(newData) {
  // Convert newData to match the format expected by updateTable
  const formattedData = newData.map((newItem) => {
    return {
      date: newItem.date,
      time: newItem.time,
      label: newItem.label,
      attendance: newItem.attendance
    };
  });

  // Update the HTML table
  

  // Filter out duplicate rows based on label and attendance
  const uniqueData = formattedData.filter((newItem) => {
    return !excelData.some((existingRow) => {
      return existingRow[2] === newItem.label && existingRow[3] === newItem.attendance;
    });
  });

  // Update excelData with the new data
  excelData.push(...uniqueData);

  // Append unique data to the workbook
  const sheetData = uniqueData.map((item) => [item.date, item.time, item.label, item.attendance]);
  XLSX.utils.sheet_add_aoa(worksheet, sheetData, { origin: -1 });

  // Send the new data to the other project
  updateTable(uniqueData);
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

});

// Define the event listener before sending any messages

// Call sendDataToOtherProject when needed
// For example:
// sendDataToOtherProject(uniqueData);
