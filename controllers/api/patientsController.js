import Patient from "../../models/patient.js";
import Doctor from "../../models/doctors.js";
import Report from "../../models/reports.js";

export async function patientProfile(req, res)
{
    return res.status(200).json({"message": "patient profile"});
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


export async function createReport(req, res)
{
    return res.status(201).json(
        {
            "status" : "success",
            "message" : "this is report",
        }
    )
}