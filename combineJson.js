const fs = require('fs');

const one = require('./real-estate1.json');
const two = require('./real-estate2.json');
const three = require('./real-estate3.json');
const four = require('./real-estate4.json');
const five = require('./real-estate5.json');
const six = require('./real-estate6.json');
const seven = require('./real-estate7.json');
const eight = require('./real-estate8.json');

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
	'realEstateCombined.json',
	JSON.stringify(combine),
	'utf8',
	function (err) {
		if (err) throw err;
		console.log('Saved!');
	}
);
