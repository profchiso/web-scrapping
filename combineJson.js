const fs = require('fs');

const one = require('./doctors1.json');
const two = require('./doctors2.json');
const three = require('./doctors3.json');
const four = require('./doctors4.json');
const five = require('./doctors5.json');
const six = require('./doctors6.json');
const seven = require('./doctors7.json');
const eight = require('./doctors8.json');

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
	'doctorsCombined.json',
	JSON.stringify(combine),
	'utf8',
	function (err) {
		if (err) throw err;
		console.log('Saved!');
	}
);
