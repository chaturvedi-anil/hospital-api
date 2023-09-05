import Doctor from '../../models/doctors.js';

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
        console.log('Error in registering the error : ', error);
        return res.status(500).json
        (
            {
                status: 'error',
                message: 'Internal server Error',
                data: error
            }
        );
    }
}

export async function createSession(req, res)
{

}