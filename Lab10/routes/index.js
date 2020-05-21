
const userRoutes = require('./user');

const constructorMethod = app => {
    app.use('/', userRoutes);
    app.use('*', (req, res) => {
        res.status(404);
    })
}

module.exports = constructorMethod;