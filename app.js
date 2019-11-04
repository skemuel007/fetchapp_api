const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

// security middleware
app.use(helmet());

// middle for logging
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// enable cors
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        'message' : 'success',
        'data' : null
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
