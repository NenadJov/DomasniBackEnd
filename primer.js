// 1'use strict';
// const fs = require('fs');

// let rawdata = fs.readFileSync('student.json');
// let student = JSON.parse(rawdata);
// console.log(student);


// 2'use strict';
// const fs = require('fs');

// fs.readFile('student.json', (err, data) => {
//     if (err) throw err;
//     let student = JSON.parse(data);
//     console.log(student);
// });

// console.log('This is after the read call');


// 3'use strict';
// let jsonData = require('./student.json');

// console.log(jsonData);


// 4'use strict';
// const fs = require('fs');

// let student = { 
//     name: 'Mike',
//     age: 23, 
//     gender: 'Male',
//     department: 'English',
//     car: 'Honda' 
// };
 
// let data = JSON.stringify(student, null, 2);
// fs.writeFileSync('student-2.json', data);


// 5'use strict';
// const fs = require('fs');

// let student = { 
//     name: 'Mike',
//     age: 23, 
//     gender: 'Male',
//     department: 'English',
//     car: 'Honda' 
// };
 
// let data = JSON.stringify(student, null, 2);

// fs.writeFile('student-3.json', data, (err) => {
//     if (err) throw err;
//     console.log('Data written to file');
// });

// console.log('This is after the write call');