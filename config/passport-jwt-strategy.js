import passport from 'passport';
import passportJwt from 'passport-jwt';
const JWTStrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;
import Doctor from '../models/doctors.js';

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial',
}

passport.use(new JWTStrategy(opts, async function(jwtPayload, done)
{
    try
    {
        let doctor = await Doctor.findById(jwtPayload._id);
        if(doctor)
        {
            return done(null, user);
        }
        else
        {
            return done(null, false);
        } 
    }
    catch(error)
    {
        console.log('Error in jwt : ', error);
    }
}));

export default passport;