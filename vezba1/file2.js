var printFirstFunc = require('./file1');

var zaPrint = function () {
    console.log('isprintano vo konzola' + printFirstFunc.retString("vezba1"));
}

module.exports = zaPrint;
