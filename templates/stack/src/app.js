const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/', (req, res, next) => {
    res.send("Hello world");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});