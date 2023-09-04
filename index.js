const express = require('express');
const PORT = 8000;

const app = express();



app.use('/', require('./rotues/index.js'));

app.listen(PORT, (err)=>
{
    if(err)
    {
        console.log('Error in running server ', err);
        return;
    }
    console.log(`express server is running on ${PORT} port !`);
});