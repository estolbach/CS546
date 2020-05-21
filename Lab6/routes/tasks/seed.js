const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const bands = data.bands;
const albums = data.albums;


const main = async () => {
	const db = await dbConnection();
	await db.dropDatabase();

	const beatles = await bands.addBand("Beatles", ["John Lenon", "Paul McCartney", "George Harrison", "Ringo Starr"], 1960, ["Rock", "Pop"], "Apple")
	const id = beatles._id;

	console.log('Done seeding database');

};

main().catch(console.log);
