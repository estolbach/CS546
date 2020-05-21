const mongoCollections = require('../mongoCollections');
const animals = mongoCollections.animals;

module.exports = {

    async create(name, animalType) {
        if (!name || typeof name != 'string') throw 'You must provide a name for your animal';

        if (!animalType || typeof animalType != 'string') throw 'You must provide the animal type';

        const animalCollection = await animals();

        let newAnimal = {
            name: name,
            animalType: animalType
        };

        const insertInfo = await animalCollection.insertOne(newAnimal);
        if (insertInfo.insertedCount === 0) throw 'Could not add animal';

        const newId = insertInfo.insertedId;

        const animal = await this.get(newId);
        return animal;
    },

    async getAll() {
        const animalCollection = await animals();

        const animalList = await animalCollection.find().toArray();

        return animalList;
    },

    async get(id) {
        if (!id) throw 'You must provide an id to search for';
        const animalCollection = await animals();
        const animal = await animalCollection.findOne({ _id: id });
        if (animal === null) throw 'No animal with that id';

        return animal;
    },

    async remove(id) {
        if (!id) throw 'You must provide an id to search for';

        const animalCollection = await animals();
        const deletionInfo = await animalCollection.deleteOne({ _id: id });

        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete animal with id of ${id}`;
        }
        return { deleted: true };
    },

	async rename(id, newName) {
		if (!id) throw 'You must provide an id to search for';

		if (!newName || typeof newName != 'string') throw 'You must provide a name for your animal';

		const animalCollection = await animals();
		const updatedAnimal = {
			name: newName
		};

		const updatedInfo = await animalCollection.updateOne({ _id: id }, { $set: updatedAnimal });
		if (updatedInfo.modifiedCount === 0) {
			throw 'could not update animal successfully';
		}

		return await this.get(id);
	}
};