import Patient from "../../models/patient.js";
import Doctor from "../../models/doctors.js";
import Report from "../../models/reports.js";

export async function getAllReports(req, res)
{
    try
    {
        let patient = await Patient.findById(req.params.id);
        if(patient)
        {
            // TODO only send doctor patient status date
            let patientReport = await Report.find({patient: patient}, 'doctor patient status date');

            if(patientReport)
            {
                return res.status(201).json(
                {
                    "status": "success",
                    "message": "this is a list of your reports",
                    "data": patientReport
                });
            }
            else
            {
                return res.status(201).json(
                {
                    "status": "success",
                    "message": "You don't have any reports",
                });
            }
        }
        else
        {
            return res.status(401).json(
            {
                "status": "error",
                "message": "Unautherized User",
            });
        }
    }
    catch(error)
    {
        console.log('Error in geting patient report :', error);
        return res.status(500).json
        (
            {
                status: 'error',
                message: 'Internal server error',
            }
        );
    }
}
export async function registerPatient(req, res)
{
    try
    {
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

        let patientReport = await Report.findOne({patient: patient._id});

        console.log("patient Report : ", patientReport);

        return res.status(201).json(
            {
                "status": "success",
                "message": "this is the report of patient",
                data:
                {
                    "patient name": patientReport.patient.name,
                    "doctor name": patientReport.doctor.name,
                    "status": patientReport.status,
                    "date": patientReport.date
                }
            }
        );
    }
    catch(error)
    {
        console.log('Error in registering new patient');
        return res.status(500).json
        (
            {
                status: 'error',
                message: 'Internal server error',
            }
        );
    }
}


export async function createReport(req, res) 
{
    try 
    {
        let patient = await Patient.findById({ _id: req.params.id }, '_id');

        if (!req.user._id || !patient) 
        {
            return res.status(400).json(
            {
                "error": "Bad Request",
                "message": "Missing required parameter"
            });
        } 
        else 
        {
            console.log(req.body);

            // Validate the user input and ensure it's one of the allowed enum values
            const status = req.body.status;

            if (!['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'].includes(status)) 
            {
                return res.status(400).json({
                    status: "error",
                    message: 'Invalid status value'
                });
            }

            // Create a new report with the validated status value
            const newReport = await Report.create(
            {
                doctor: req.user._id,
                patient: patient._id,
                status: req.body.status,
            });

            return res.status(201).json(
            {
                status: 'success',
                message: 'Patient report is created',
                data: newReport
            });
        }

    } 
    catch (error) 
    {
        console.log('Error in creating patient report', error);
        return res.status(500).json(
        {
            status: 'error',
            message: 'Internal server error',
        });
    }
}
