const fs = require("fs/promises");
const path = require("path");

const tasksPath = path.join(__dirname, '..', 'db', 'tasks.json');

const readDb = async () => {
const rawJson = await fs.readFile(tasksPath);
return JSON.parse(rawJson);   
}  

const writeDb = async (data) => {
    await fs.writeFile(tasksPath, JSON.stringify(data, null, 2));
}


module.exports = {readDb, writeDb}