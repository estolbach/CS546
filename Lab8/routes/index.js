const resultRoutes = require('./result');
const path = require('path');

const constructorMethod = (app) => {
	app.use('/result', resultRoutes);
	app.get('/', (req, res) => {
		res.sendFile(path.resolve('static/about.html'));
	});

	app.use('*', (req, res) => {
		res.redirect('/');
	});
};

module.exports = constructorMethod;
