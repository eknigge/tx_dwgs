
const { json } = require('express/lib/response');
const fs = require('fs');

let jsonContent = fs.readFileSync('test.json');
let data = JSON.parse(jsonContent)
data.data = 115;

console.log(data);
console.log(data.data);