const express = require('express');
const router = express.Router();
const data = require('../data');
const bands = require('../data/bands');
const albumData = data.albums;

router.get('/', async (req, res) => {
	try {
		let albumList = await albumData.getAllAlbums();
		//make it async because we have a await inside
		let promises = albumList.map(async a => {
			let albumBand = await bands.getBand(a.author)
			let result = {_id: a._id, title: a.title, author: {_id: a.author, bandName: albumBand.bandName}, songs: a.songs}
			return result
		})
		// Need to wait for all promises in the array to resolve
		let result = await Promise.all(promises)
		res.status(200).json(result)
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

router.post('/', async (req, res) => {
	let albumInfo = req.body;
	if (!albumInfo) {
		res.status(400).json({ error: 'You must provide data to create an album' });
		return;
	}
	if (!albumInfo.title) {
		res.status(400).json({ error: 'You must provide a title' });
		return;
	}
	if (!albumInfo.author) {
		res.status(400).json({ error: 'You must provide an author' });
		return;
	}
    if (!albumInfo.songs) {
		res.status(400).json({ error: 'You must provide a song' });
		return;
	}
	try {
		const newAlbum = await albumData.addAlbum(albumInfo.title, albumInfo.author, albumInfo.songs);
		await bands.addAlbumToBand(newAlbum.author, newAlbum._id, newAlbum.title, newAlbum.author, newAlbum.songs);
		let albumBand = await bands.getBand(newAlbum.author);
		newAlbum["author"] = {
			"_id": albumBand._id,
			"bandName": albumBand.bandName
		}
		res.status(200).json(newAlbum);
	} catch (e) {
		res.status(500).json({"error": e.message});
	}
});

router.get('/:id', async (req, res) => {
	try {
		let album = await albumData.getAlbum(req.params.id);
		let albumBand = await bands.getBand(album.author);
		album["author"] = {
			"_id": albumBand._id,
			"bandName": albumBand.bandName
		}
		res.status(200).json(album);
	} catch (e) {
		res.status(404).json({ "error": e.message });
	}
});


router.patch('/:id', async (req, res) => {
	const requestBody = req.body;
	let updatedObject = {};
	try {
		const oldAlbum = await albumData.getAlbum(req.params.id);
		if (requestBody.newTitle) updatedObject.title = requestBody.newTitle;
		if (requestBody.newSongs) updatedObject.songs = requestBody.newSongs;
	} catch (e) {
		res.status(404).json({ error: 'Album not found' });
		return;
	}

	try {
		const updatedAlbum = await albumData.updateAlbum(req.params.id, updatedObject);
		res.status(200).json(updatedAlbum);
	} catch (e) {
		res.status(404).json({ "error": e.message });
	}
});

router.delete('/:id', async (req, res) => {
	if (!req.params.id) {
		res.status(400).json({ error: 'You must Supply an ID to delete' });
		return;
	}
	let albumDelete;
	try {
		albumDelete = await albumData.getAlbum(req.params.id);
	} catch (e) {
		res.status(404).json({ error: 'Album not found' });
		return;
	}
	try {
		await albumData.removeAlbum(req.params.id);
		await bands.removeAlbumFromBand(albumDelete.author, req.params.id);
		res.status(200).json({deleted: true, data: albumDelete});
	} catch (e) {
		res.status(500).json({"error": e.message});
	}
});

module.exports = router;
