// "use strict;";
// const {
//   createReadStream,
//   createWriteStream,
//   appendFile,
//   writeFile
// } = require("fs");
// const { Transform, Writable } = require("stream");

// const upperCasify = Transform();

// upperCasify._transform = (buffer, _, callback) => {
//   callback(null, buffer.toString().toUpperCase());
// };

// const writeStream = Writable();

// writeStream._write = (buffer, _, next) => {
//   writeFile("language_caps.json", buffer, err => {
//     if (err) throw err;
//     console.log("The uppercase version has been formed!");
//   });
//   next();
// };

// createReadStream("language.json")
//   .pipe(upperCasify)
//   .pipe(writeStream);

let $ = require('jquery');

let slug = "downward-facing-dog-pose";
let inputs = slug.replace('-','%20');

function getInstructions() {

    $.ajax({
        url: `http://api.wolframalpha.com/v2/query?appid=A9HAKK-J9Y3EQXYPA&output=json&input=${inputs}`,
    }).done(function(data) {
        console.log("Sample of data:", data);
    });
}

getInstructions();