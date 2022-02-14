const express = require('express');
const app = express();
const configRoutes = require('./routes');

configRoutes(app);

const Port = 3000;
app.listen(Port, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});
