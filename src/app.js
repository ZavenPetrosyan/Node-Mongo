const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const helmet = require("helmet");

const clients = require("./routes/client.route");
const provider = require("./routes/provider.route")

// connect mongodb
const shopDb = 'mongodb://localhost:27017/clients';
mongoose.connect(shopDb, {
    useNewUrlParser: true, 
    useCreateIndex: true
}).then(() => console.log(`connected`)).catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

//  hendling CORS error's
app.use((req,res,next) => {                         
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.use("/clients", clients);
app.use("/providers", provider);
// ERROR hendling
app.use((req,res,next) => {                     
    const error  = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;