const blogsRoutes = require('./blogs');

const constructorMethod = (app) => {
    app.use('/blog', blogsRoutes);

    app.use('*', (req, res) => {
        res.status(404).json("page not found")
    })
};

module.exports = constructorMethod;