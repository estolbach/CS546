const mongoCollections = require('../config/mongoCollections');
const albums = mongoCollections.albums;
//const { ObjectId } = require('mongodb');
const uuid = require('uuid/v4');


async function getAllAlbums() {
  const albumCollection = await albums();
  const albumList = await albumCollection.find({}).toArray();
  if (!albumList) throw 'No albums in system!';
  return albumList;
}


async function getAlbum(id) {
    const albumCollection = await albums();
    const album = await albumCollection.findOne({_id: id});
    if (!album) throw 'Album not found';
    return album;
}

async function getAlbumAuthor(author) {
    const albumCollection = await albums();
    const album = await albumCollection.find({author: author}).toArray();
    if(!album) throw 'Album not found'
    return album;
}

async function addAlbum(title, author, songs) {
  if (!title || typeof(title) !== 'string') throw `Error: Title not Supplied.`;
  if (!author || typeof(author) !== 'string') throw `Error: Author not Supplied.`;
  if (!songs || !Array.isArray(songs)) throw `Error: Songs are not supplied or not an array.`;
  if (songs.Length <= 0) throw `Error: There must be at least one song supplied`;
  const albumCollections = await albums();
  let newAlbum = {
    _id: uuid(),
    title: title,
    author: author,
    songs: songs
  };
  const newInsertInformation = await albumCollections.insertOne(newAlbum);
  if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
  return await this.getAlbum(newInsertInformation.insertedId);
}

async function removeAlbum(id) {
    const albumCollection = await albums();
    let album = null;
    try {
        album = await this.getAlbum(id);
    } catch (e) {
      console.log(e);
      return;
    }
    const deletionInfo = await albumCollection.removeOne({_id: id});
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete album with id of ${id}`;
    }
    return true;
}

async function deleteMany(author) {
    try {
        const albumCollection = await albums();
        await albumCollection.deleteMany({author: author});
    } catch (e) {
        console.log(e);
        return;
    }
}

async function updateAlbum(albumId, updatedAlbum) {
	//Input Checking
	if (!albumId) throw `Error: Album ID not Supplied.`;
	if (typeof albumId !== 'string' && typeof albumId !== 'object') throw 'ID must be a string or object ID';
	/*	The following condition is so the function can either handle an Object ID or a String passed into it.
		If it's a string, then convert it to an object ID, if it's already and object ID,
		no need to do anything more, just pass it to the query
	*/
	// if (typeof id === 'string') {
	// 	albumId = ObjectId.createFromHexString(albumId);
	// 	console.log('I converted a string to an object ID');
	// }
	const albumCollection = await albums();
	const updatedAlbumData = {};

	if(updatedAlbum.title) {
      const updatedInfo = await albumCollection.updateOne({ _id: albumId }, {$set: {title: updatedAlbum.title}});
      if (updatedInfo.modifiedCount === 0) throw 'Error: failed to update album';
    }

	if(updatedAlbum.songs) {
	  const updatedInfo = await albumCollection.updateOne({ _id: albumId }, {$addToSet: {songs: updatedAlbum.songs}});
      if (updatedInfo.modifiedCount === 0) throw 'Error: failed to update album';
	}

	//const updatedInfo = await albumCollection.updateOne({ _id: albumId }, { $set: updatedAlbumData });

	return await this.getAlbum(albumId);
};

module.exports = {
	getAllAlbums,
	getAlbum,
	updateAlbum,
	removeAlbum,
    addAlbum,
    getAlbumAuthor,
    deleteMany
};

