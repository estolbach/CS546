const animals = require('./data/animals');
const connection = require('./mongoConnection');

const main = async () => {
	console.log("Create an animal named Sasha with the type of Dog");
	const sasha = await animals.create('Sasha', 'Dog');
	console.log(sasha);

	console.log("\nCreate an animal named Lucy, with the type of Dog");
	const lucy = await animals.create('Lucy', 'Dog');
	console.log(lucy);

	console.log("\nQuery all animals, and log them all");
	const getAll = await animals.getAll();
	console.log(getAll);

	console.log("\nCreate an animal named Duke, with a type of Walrus");
	const duke = await animals.create('Duke', 'Walrus');
	console.log(duke);

	console.log("\nRename Sasha to Sashita");
	const updatedSashita = await animals.rename(sasha._id, 'Sashita');
	console.log(updatedSashita);


	await animals.remove(lucy._id);

	console.log("\nQuery all animals, and log them all");
	const logAll = await animals.getAll();
	console.log(logAll);

	console.log("\nFind animal named Duke");
	const find = await animals.get(duke._id);
	console.log(find);

	const db = await connection();
	await db.serverConfig.close();

	console.log('\nDone!');
};

main().catch((error) => {
	console.log(error);
});