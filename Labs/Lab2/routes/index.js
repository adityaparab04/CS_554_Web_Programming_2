const userRoutes = require('./users');

const constructorMethod = (app) => {
    app.use('/api/people', userRoutes);

    app.use('*', (req, res) => {
        res.sendStatus(404).json({Error: "Page not found"});
    })
};

module.exports = constructorMethod;