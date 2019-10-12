const express = require('express');

const app = express();

// app.get('/', (req, res) =>{
//     res.send('<h1>hello world</h1>');
// });

// 'use strict';

// const fs = require('fs');

// let rawdata = fs.readFileSync('student.json');
// let student = JSON.parse(rawdata);
// console.log(student);

// 'use strict';

// const fs = require('fs');

// fs.readFile('student.json', (err, data) => {
//     if (err) throw err;
//     let student = JSON.parse(data);
//     console.log(student);
// });

// console.log('This is after the read call');

// 'use strict';

// let jsonData = require('./student.json');

// console.log(jsonData);

// 'use strict';

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

// 'use strict';

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

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`server started on ${PORT}`));
