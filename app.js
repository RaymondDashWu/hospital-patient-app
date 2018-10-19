
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const hospitals = require('./controllers/hospitals')
const Hospital = require('./models/hospital_model')
const messages = require('./controllers/messages')
const Message = require('./models/message_model')

app.engine('handlebars', exphbs({defaultLayout: 'main'}));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/intensive1', {useNewUrlParser: true})
.then(() => {
    console.log("Connected to DB");
})
.catch( err => {
    console.log(err.message);
})

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(methodOverride('_method'));
app.use(express.static('public'));

// CONTROLLERS
hospitals(app, Hospital);
messages(app, Message);

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000!')
})

module.exports = app
