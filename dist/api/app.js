if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const path = require('path');

// Basic Configuration
const port = process.env.PORT || 3000;

// register view engine
app.set('view engine', 'ejs');

// adding express static files
app.use(express.static(path.join(__dirname, '../../views/public')));

// importing router from the backend
app.use(require('./routers'));

// error handler middleware
app.use(require('../middleware/errorHandler'));

// starting the app
app.listen(port, async()=>{
    console.log(`server on at http://localhost:${port}`);
})