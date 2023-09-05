import Patient from "../../models/patient.js";
import Report from "../../models/reports.js";

export async function registerPatient(req, res)
{
    try
    {
        console.log('register patient contoller');
        let patient = await Patient.findOne({phoneNumber: req.body.phoneNumber});

        if(!patient)
        {
            let newPatient = await Patient.create(req.body);

            return res.status(201).json
            (
                {
                    status: 'success',
                    message: 'New Patient is rgistered now',
                    data: newPatient
                }
            );
        }

        // 
        return res.status(409).json
        (
            {
                status: 'success',
                message: 'patient is already exist',
                data: patient
            }
        );
    }
    catch(error)
    {
        return res.status(500).json
        (
            {
                status: 'error',
                message: 'Error in registering new patient',
                data: error
            }
        );
    }
}

// let patientReport = await Report.findOne({patient: patient._id});

//         console.log("patient Report : ", patientReport);

//         return res.status(201).json(
//             {
//                 "status": "success",
//                 "message": "this is the report of patient",
//                 data:
//                 {
//                     "patient name": patientReport.patient.name,
//                     "doctor name": patientReport.doctor.name,
//                     "status": patientReport.status,
//                     "date": patientReport.date
//                 }
//             }
//         );