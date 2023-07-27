const fs = require('fs').promises;
const path = require('path');
const { json } = require('stream/consumers');
const prompt = require('prompt-sync')();

// Read the JSON file and parse it into an array of objects
const targetFolder = "./raw";

const readAndWriteFiles = async () => {
  const files = await fs.readdir(targetFolder)
  
  const mergedData = {};
  
  for (const file of files) {
    const filePath = path.join(targetFolder,file)
    const rawData = await fs.readFile(filePath,"utf-8")
    const jsonData = JSON.parse(rawData)
    // console.log(jsonData)
    Object.assign(mergedData, jsonData)
  }
  // console.log(mergedData)

  await fs.writeFile("./mergedData.json",JSON.stringify(mergedData),"utf-8")
}

const getFiles = async (index) => {
  const rawData = await fs.readFile("mergedData.json", "utf-8")
  const jsonData = JSON.parse(rawData)
  console.log(jsonData[`${index}`])
}

const answer = prompt("S: sort files G: getFiles What would you like to do? ").toUpperCase()
if (answer === "S") {
  readAndWriteFiles()
} else if (answer === "G") {
  const index = prompt("At what index? ")
  try {
    getFiles(index)
  } catch {
    console.log("Sorry index or file not found try again please.")
  }
} else {
  console.log("No worries, have a good day!")
}

// const rawData = fs.readFileSync('./kanji_bank_1.json');
// const dataArray = JSON.parse(rawData);

// // Add an "id" property to each object in the array
// dataArray.forEach((obj, index) => {
//   obj.id = index + 1; // Assuming you want IDs starting from 1
// });

// // If you want to convert the modified array back to a JSON string:
// const modifiedJSONString = JSON.stringify(dataArray);

// // Save the modified JSON back to a file (optional)

// console.log(dataArray);
