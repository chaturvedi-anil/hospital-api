import dotenv from 'dotenv';
dotenv.config();

import passport from 'passport';
import passportJwt from 'passport-jwt';
const JWTStrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;
import Doctor from '../models/doctors.js';

let opts = 
{
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY,
}

passport.use(new JWTStrategy(opts, async function (jwtPayload, done) 
{
    try 
    {
        let doctor = await Doctor.findById(jwtPayload.id);
        if (doctor) 
        {
            return done(null, doctor, {message: 'User Authenticated Successfully'}); 
        } 
        else 
        {
            return done(null, false);
        }
    } 
    catch(error) 
    {
        console.log('Error in jwt : ', error);
        return done(error); // Return the error
    }
}));

export default passport;
