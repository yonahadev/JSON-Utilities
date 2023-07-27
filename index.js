const fs = require('fs').promises;
const path = require('path');
const prompt = require('prompt-sync')();

const targetFolder = "./raw";

const readAndWriteFiles = async () => {
  const files = await fs.readdir(targetFolder)
  
  const mergedData = {};
  
  for (const file of files) {
    if (file === ".gitkeep") {
      continue;
    }
    
    const filePath = path.join(targetFolder, file)
    const rawData = await fs.readFile(filePath,"utf-8")
    const jsonData = JSON.parse(rawData)
    Object.assign(mergedData, jsonData)
  }

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

