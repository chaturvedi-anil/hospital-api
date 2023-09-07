import Doctor from '../../models/doctors.js';
import jwt from 'jsonwebtoken';

// register doctor
export async function registerDoctor(req, res)
{
    try
    {
        let doctor = await Doctor.findOne({email:req.body.email});
        
        if(doctor)
        {
            return res.status(409).json(
                {
                    status: 'error',
                    message: 'User already exists',
                }
            );
        }

        let newDoctor = await Doctor.create(req.body);

        // Use a projection query to retrieve only 'name' and 'email' fields
        newDoctor = await Doctor.findById(newDoctor._id, 'name email');

        return res.status(201).json
        (
            {
                status: 'success',
                message: 'Doctor is rgistered now',
                data:
                {
                    name: newDoctor.name,
                    email: newDoctor.email
                }
            }
        );
    }
    catch(error)
    {
        console.log('Error in registering the doctor : ', error);
        return res.status(500).json
        (
            {
                status: 'error',
                message: 'Internal server Error',
            }
        );
    }
}

// creating session for doctor 
export async function createSession(req, res)
{
    try
    {
        let doctor = await Doctor.findOne({email: req.body.email});
        if(!doctor || req.body.password !== doctor.password)
        {
            // fail response
            return res.status(401).json(
                {
                    "status": "error",
                    "message": "Incorrect username or password"
                }
            );
        }

        // success response
        return res.status(200).json(
            {
                "status": "success",
                "message": "Sign-in successful, here is your token please keep it safe!",
                "data": 
                {
                    // token expire after 30 minute 
                    "token": jwt.sign(doctor.toJSON(), 'codeial', {expiresIn: 30 * 60}) 
                }
            }  
        );

    }
    catch(error)
    {
        console.log('Error in creating session for doctor  : ', error);
        return res.status(500).json
        (
            {
                status: 'error',
                message: 'Internal server Error',
            }
        );
    }
}