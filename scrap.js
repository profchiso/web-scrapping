const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');

//https://www.vconnect.com/lagos/list-of-restuarant_c7037?ref=autocomplete&page=1
//https://www.businesslist.com.ng/category/doctors-and-clinics/3

const funScript = async () => {
	await request(
		'https://www.businesslist.com.ng/category/schools/8',
		(error, res, html) => {
			if (error) console.log(error);
			console.log('scraping stated....');
			if (res.statusCode === 200) {
				let $ = cheerio.load(html);
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

					let link = $(elem).find('.v').next().attr('href');
					let imageUrl = $(elem).find('.logo span meta').attr('content');

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
						category: 'Schools',

						link:
							link === undefined
								? undefined
								: `https://www.businesslist.com.ng${link}`,
						imageUrl,
					});
				});
				//console.log(data);

				let withLink = data.filter((elem) => elem.link !== undefined);
				let final = [];

				withLink.forEach(async (elem) => {
					if (elem.link !== undefined) {
						await request(`${elem.link}`, (error, res, html) => {
							if (res.statusCode === 200) {
								let $ = cheerio.load(html);

								let phone = $('.phone').text();
								let site = $('.weblinks').text();

								elem.phone = phone;
								elem.website = site;
								final.push(elem);
								if (final.length === withLink.length) {
									console.log(final);
									fs.appendFile(
										'schools8.json',
										JSON.stringify(final),
										'utf8',
										function (err) {
											if (err) throw err;
											console.log('Saved!');
										}
									);
								}
							}
						});
					}
				});
			}
		}
	);
};

funScript();
