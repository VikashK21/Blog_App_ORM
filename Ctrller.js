require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 2030;
const morgan = require('morgan');
const accRouter = require('./routes/loginR');
const ctrlRouter = require('./routes/usresR');

app.use(morgan('dev'));
app.use(express.json());
app.use('/', accRouter);
app.use('/', ctrlRouter);


app.get('/', (req, res) => {
    res.send('Welcome to the front page.')
})

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})