const express = require('express');
const router = express.Router();
const data = require('../data');
const bandData = data.bands;
const albumData = data.albums ;

router.get('/', async (req, res) => {
	try {

		const bandList = await bandData.getAllBands();
		for (let band in bandList) {
			let albums = await albumData.getAlbumAuthor(bandList[band]._id) ;
			bandList[band].albums = albums
		}
		res.status(200).json(bandList)
	} catch (e) {
		res.status(500).json({ error: e });
	}
});


router.post('/', async (req, res) => {
	const bandPostData = req.body;
	if (!bandPostData.bandName) {
		res.status(400).json({ error: 'You must provide a band name' });
		return;
	}
	if (!bandPostData.bandMembers) {
		res.status(400).json({ error: 'You must provide band members' });
		return;
	}
	if (!bandPostData.yearFormed) {
		res.status(400).json({ error: 'You must provide the year formed' });
		return;
	}
    if (!bandPostData.genres) {
        res.status(400).json({ error: 'You must provide the genres' });
        return;
    }
    if (!bandPostData.recordLabel) {
        res.status(400).json({ error: 'You must provide the record label' });
        return;
    }
	try {
		const { bandName, bandMembers, yearFormed, genres, recordLabel, albums } = bandPostData;
		const newBand = await bandData.addBand(bandName, bandMembers, yearFormed, genres, recordLabel, albums);
		res.status(200).json(newBand);
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const band = await bandData.getBand(req.params.id);
		let albums = await albumData.getAlbumAuthor(band._id) ;
		band.albums = albums
		res.json(band);
	} catch (e) {
		res.status(404).json({ error: 'Band not found' });
	}
});

router.put('/:id', async (req, res) => {
	const updatedData = req.body;
	if (!updatedData.bandName || !updatedData.bandMembers || !updatedData.yearFormed || !updatedData.genres || !updatedData.recordLabel) {
		res.status(400).json({ error: 'You must Supply All fields' });
		return;
	}
	try {
		await bandData.getBand(req.params.id);
	} catch (e) {
		res.status(404).json({ error: 'Band not found' });
		return;
	}

	try {
		const updatedBand = await bandData.updateBand(req.params.id, updatedData);
		res.status(200).json(updatedBand);
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

router.delete('/:id', async (req, res) => {
	if (!req.params.id) {
		res.status(400).json({ error: 'You must Supply and ID to delete' });
		return;
	}
	let bandDelete;
	try {
		bandDelete = await bandData.getBand(req.params.id);
	} catch (e) {
		res.status(404).json({ error: 'Band not found' });
		return;
	}
	try {
		await bandData.removeBand(req.params.id);
		await albumData.deleteMany(req.params.id);
		res.status(200).json({deleted: true, data: bandDelete});
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

module.exports = router;