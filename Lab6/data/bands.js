const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
//const { ObjectId } = require('mongodb');
const uuid = require('uuid/v4');



const addBand = async function addBand(bandName, bandMembers, yearFormed, genres, recordLabel, albums) {
	//Input Checking
	if (!bandName || typeof(bandName) !== 'string') throw `Error: Band Name not Supplied.`;
	if (!yearFormed || typeof(yearFormed) !== 'number') throw `Error: Year Formed not Supplied.`;
	if (!recordLabel) throw `Error: Record Label not Supplied.`;
	if (!bandMembers || !Array.isArray(bandMembers)) throw `Error: Band Members is not supplied or not an array.`;
	if (!genres || !Array.isArray(genres)) throw `Error: Genres is not supplied or is not an array.`;

	if (!Array.isArray(albums)) {
		albums = [];
	}

	if (bandMembers.Length <= 0) throw `Error: There must be at least one band member supplied`;
	if (genres.Length <= 0) throw `Error: There must be at least one genre supplied`;


	const bandCollections = await bands();

	let newBand = {
		_id: uuid(),
		bandName: bandName,
		bandMembers: bandMembers,
		yearFormed: yearFormed,
		genres: genres,
		recordLabel: recordLabel,
		albums: albums
	};
	const insertBand = await bandCollections.insertOne(newBand);
	if (insertBand.insertedCount === 0) throw 'Error: failed to insert band';

	const newId = insertBand.insertedId;
	const band = await this.getBand(newId);

	return band;
};

const addAlbumToBand = async function addAlbumToBand(bandId, albumId, albumTitle, albumAuthor, albumSongs) {
    let currentBand = await this.getBand(bandId);
    console.log(currentBand);

    const bandCollection = await bands();
    const updateInfo = await bandCollection.updateOne(
      {_id: bandId},
      {$addToSet: {albums: {id: albumId, title: albumTitle, author: albumAuthor, songs: albumSongs}}}
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

    return await this.getBand(bandId);
};

const getAllBands = async function getAllBands() {
	const bandCollection = await bands();

	const bandList = await bandCollection.find({}).toArray();

	return bandList;
};


const getBand = async function getBand(id) {
	//Input Checking
	if (!id) throw 'Error: no ID';
	if (typeof id !== 'string') throw 'ID must be a string';

	/*	The following condition is so the function can either handle an Object ID or a String passed into it.
		If it's a string, then convert it to an object ID, if it's already and object ID,
		no need to do anything more, just pass it to the query
	*/
	// if (typeof id === 'string') {
	// 	id = ObjectId.createFromHexString(id);
	// 	console.log('I converted a string to an object ID');
	// }
	const bandCollection = await bands();
	const bandGet = await bandCollection.findOne({ _id: id });
	if (bandGet === null) throw 'Error: no band has the input ID';

	return bandGet;
};

const updateBand = async function updateBand(bandId, updatedBand) {
	//Input Checking
	if (!bandId) throw `Error: Band ID not Supplied.`;
	if (typeof bandId !== 'string' && typeof bandId !== 'object') throw 'ID must be a string or object ID';
	/*	The following condition is so the function can either handle an Object ID or a String passed into it.
		If it's a string, then convert it to an object ID, if it's already and object ID,
		no need to do anything more, just pass it to the query
	*/
	// if (typeof id === 'string') {
	// 	bandId = ObjectId.createFromHexString(bandId);
	// 	console.log('I converted a string to an object ID');
	// }
	const bandCollection = await bands();
	const updatedBandData = {};

	if(updatedBand.bandName) {
      updatedBandData.bandName = updatedBand.bandName;
    }

	if(updatedBand.bandMembers) {
	  updatedBandData.bandMembers = updatedBand.bandMembers;
	}

	if(updatedBand.yearFormed) {
	  updatedBandData.yearFormed = updatedBand.yearFormed;
	}

	if(updatedBand.genres) {
	  updatedBandData.genres = updatedBand.genres;
	}

	if(updatedBand.recordLabel) {
	  updatedBandData.recordLabel = updatedBand.recordLabel;
	}

	const updatedInfo = await bandCollection.updateOne({ _id: bandId }, { $set: updatedBandData });
	if (updatedInfo.modifiedCount === 0) throw 'Error: failed to update band';

	return await this.getBand(bandId);
};

const removeBand = async function removeBand(id) {
	//Input Checking
	if (!id) throw `Error: ${id} is not valid id`;
	if (typeof id !== 'string' && typeof id !== 'object') throw 'ID must be a string or object ID';
	/*	The following condition is so the function can either handle an Object ID or a String passed into it.
		If it's a string, then convert it to an object ID, if it's already and object ID,
		no need to do anything more, just pass it to the query
	*/
	// if (typeof id === 'string') {
	// 	id = ObjectId.createFromHexString(id);
	// 	console.log('I converted a string to an object ID');
	// }

	const bandCollection = await bands();

	const deletionInfo = bandCollection.deleteOne({ _id: id });
	if (deletionInfo.deletedCount === 0) throw 'Error: Failed to delete band';

	return true;
};

const removeAlbumFromBand = async function removeAlbumFromBand(bandId, albumId) {
    let currentBand = await this.getBand(bandId);
    console.log(currentBand);

    const bandCollection = await bands();
    const updateInfo = await bandCollection.updateOne({_id: bandId}, {$pull: {albums: {_id: albumId}}});
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

    return await this.getBand(bandId);
};

module.exports = {
	addBand,
	getAllBands,
	updateBand,
	removeBand,
	getBand,
	addAlbumToBand,
	removeAlbumFromBand
};
