import fs from 'fs'
import XLSX from 'xlsx'


const CSV_FILE_PATH = "./data/nodejs-hw1-ex1.xlsx"

const workbook = {}
var jsonFile = XLSX.readFile(CSV_FILE_PATH)
jsonFile.SheetNames.forEach(sheet => {
  workbook[sheet] = XLSX.utils.sheet_to_json(jsonFile.Sheets[sheet])
})


for (const key in workbook) {
  const jsonString = JSON.stringify(workbook[key])
  const fileName = `./data/sheet_${key}.json`
  fs.writeFile(fileName, jsonString, (err) => {
    if (err) {
      throw err;
    }
    console.log(`${fileName} is write successfully`);
  });

  fs.writeFile('./data/xlsxtotext.txt', jsonString, (err) => {
    if (err) {
      throw err;
    }
    console.log('xlsxtotext is write successfully');
  });

}