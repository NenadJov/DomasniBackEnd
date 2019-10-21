var printFirstFunc = require('./file1');

function forPrint() {
    console.log('isprintano vo konzola' + printFirstFunc.retString("vezba1"));
}

module.exports = forPrint;
