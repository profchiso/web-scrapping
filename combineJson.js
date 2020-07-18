const fs = require('fs');

const one = require('./schools1.json');
const two = require('./schools2.json');
const three = require('./schools3.json');
const four = require('./schools4.json');
const five = require('./schools5.json');
const six = require('./schools6.json');
const seven = require('./schools7.json');
const eight = require('./schools8.json');

const combine = [];

const all = [one, two, three, four, five, six, seven, eight];

// let withL = resCombined.filter((elem) => {
// 	elem.location.lat !== undefined && elem.location.lng !== undefined;
// });
// console.log(withL.length);

all.forEach((jsonArray) => {
	jsonArray.forEach((elem) => {
		if (elem.location.lat !== undefined && elem.location.lng !== undefined) {
			combine.push(elem);
		}
	});
});
console.log(combine.length);
fs.appendFile(
	'schoolsCombined.json',
	JSON.stringify(combine),
	'utf8',
	function (err) {
		if (err) throw err;
		console.log('Saved!');
	}
);
