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
            let patientReport = await Report.find({patient: patient});

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

}