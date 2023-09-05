import express from 'express';
import routes from './rotues/index.js';
import db from './config/mongoose.js';
import passport from 'passport';
import passportJWT from './config/passport-jwt-strategy.js';

const PORT = 8000;
const app = express();

app.use(express.json());


// redirected to folder routes
app.use('/api', routes);

app.listen(PORT, (err)=>
{
    if(err)
    {
        console.log('Error in running server ', err);
        return;
    }
    console.log(`express server is running on ${PORT} port !`);
});