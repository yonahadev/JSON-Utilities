const fs = require('fs').promises;
const path = require('path');
const prompt = require('prompt-sync')();

const targetFolder = "./unsorted";

const addID = async (file) => {
  const filePath = ("./" + file)
  const rawData = await fs.readFile(filePath,"utf-8")
  let jsonData = JSON.parse(rawData)

  const modifiedData = jsonData.map((element, index) => {
    return { ...element, id: index + 1 };
  });

  const modifiedJSONString = JSON.stringify(modifiedData, null, 2);

  await fs.writeFile("./results/modifiedFile.json", modifiedJSONString);
  
  console.log("File with IDs written successfully")
}
  
 
const readAndWriteFiles = async () => {
  const files = await fs.readdir(targetFolder)
  
  let mergedData = []
  
  for (const file of files) {
    if (file === ".gitkeep") {
      continue;
    }
    
    const filePath = path.join(targetFolder, file)
    const rawData = await fs.readFile(filePath,"utf-8")
    const jsonData = JSON.parse(rawData)
    
    mergedData = mergedData.concat(jsonData)
  }
  
  const combinedJSONString = JSON.stringify(mergedData,null,2)

  await fs.writeFile("./results/mergedData.json", combinedJSONString, "utf-8")
  
    console.log("Files combined successfully")
}

const getMergedFile = async () => {
  const rawData = await fs.readFile("./results/mergedData.json", "utf-8")
  const jsonData = JSON.parse(rawData)
  console.log(jsonData)
}

const getFileWithIDs = async () => {
  const rawData = await fs.readFile("./results/modifiedFile.json", "utf-8")
  const jsonData = JSON.parse(rawData)
  console.log(jsonData)
}

const answer = prompt("To merge files enter 'S'\nTo get your merged file enter 'M'\nTo add IDs to your file enter 'A'\nTo get your file with IDs added enter 'I'").toUpperCase()
if (answer === "S") {
  readAndWriteFiles()
} else if (answer === "M") {
  try {
    getMergedFile()
  } catch {
    console.log("Sorry file not found, please try again.")
  }
} else if (answer === "I") {
  try {
    getFileWithIDs()
  } catch {
    console.log("Sorry file not found, please try again.")
  }
} else if (answer === "A") {
  try { addID("results/mergedData.json") }
  catch {console.log("Sorry file not found, please try again.")}
} else {
  console.log("No worries, have a good day!")
}

