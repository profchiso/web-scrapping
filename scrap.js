const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');

//https://www.vconnect.com/lagos/list-of-restuarant_c7037?ref=autocomplete&page=1
//https://www.businesslist.com.ng/category/doctors-and-clinics/3

request(
	'https://www.businesslist.com.ng/category/construction-services/8',
	(error, res, html) => {
		if (error) console.log(error);
		console.log('scraping stated....');
		if (res.statusCode === 200) {
			const $ = cheerio.load(html);
			let data = [];
			$('.company').each((i, elem) => {
				let name = $(elem).find('h4').text();
				let address = $(elem).find('.address').text();
				let state = $(elem).find('.address a').next().text();
				let description = $(elem).find('.desc').text();
				let rating = $(elem).find('.company_reviews .rate').text();
				let reviews = $(elem).find('.company_reviews a').text();

				let lat = $(elem).find('.details').next().attr('data-ltd');
				let lng = $(elem).find('.details').next().attr('data-lng');

				data.push({
					name,
					address,
					state,
					description,
					rating,
					reviews,
					location: {
						lat,
						lng,
					},
					category: 'contractors',
					phone: '',
					website: '',
					email: '',
				});
				console.log(data);
			});

			fs.appendFile(
				'contractors8.json',
				JSON.stringify(data),
				'utf8',
				function (err) {
					if (err) throw err;
					console.log('Saved!');
				}
			);
		}
	}
);
