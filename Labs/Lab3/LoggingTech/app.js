// const logger = require('./logger')

// logger.warn("warning information");
// logger.info("info information");
// logger.debug("debug information");
// logger.error("error information");


const winston = require('winston');
const expressWinston = require('express-winston');
const express = require('express');
const app = express();

//more options here - https://github.com/bithavoc/express-winston#request-logging
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: false,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: true,
  ignoreRoute: function (req, res) { return false; }
}));

app.get('/', (req, res) => {
  res.send('Hello World! - Aditya logged');
});


app.get('/api/test', (req, res) => {
  res.json({'message': 'Hello Aditya!'});
});

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});





