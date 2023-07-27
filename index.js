const fs = require('fs').promises;
const path = require('path');
const prompt = require('prompt-sync')();

const targetFolder = "./unsorted";

const addID = async (file) => {
  const filePath = ("./" + file)
  const rawData = await fs.readFile(filePath,"utf-8")
  let jsonData = JSON.parse(rawData)

  // Create a new array with "id" property added to each object
  const modifiedData = jsonData.map((element, index) => {
    return { ...element, id: index + 1 };
  });

  // Convert the modified array to a JSON string
  const modifiedJSONString = JSON.stringify(modifiedData, null, 2);

  // Write the JSON string to the file
  await fs.writeFile("./modifiedFile.json", modifiedJSONString);
  
  console.log("File with IDs written successfully")
}
  
 
const readAndWriteFiles = async () => {
  const files = await fs.readdir(targetFolder)
  
  const mergedData = [];
  
  for (const file of files) {
    if (file === ".gitkeep") {
      continue;
    }
    
    const filePath = path.join(targetFolder, file)
    const rawData = await fs.readFile(filePath,"utf-8")
    const jsonData = JSON.parse(rawData)
    console.log(jsonData)
    Object.assign(mergedData,jsonData)
  }

  await fs.writeFile("./mergedData.json",JSON.stringify(mergedData),"utf-8")
}

const getFiles = async (index) => {
  const rawData = await fs.readFile("mergedData.json", "utf-8")
  const jsonData = JSON.parse(rawData)
  console.log(jsonData[`${index}`])
}

addID("test.json")

// const answer = prompt("S: sort files G: getFiles What would you like to do? ").toUpperCase()
// if (answer === "S") {
//   readAndWriteFiles()
// } else if (answer === "G") {
//   const index = prompt("At what index? ")
//   try {
//     getFiles(index)
//   } catch {
//     console.log("Sorry index or file not found try again please.")
//   }
// } else {
//   console.log("No worries, have a good day!")
// }

