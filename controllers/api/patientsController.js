import Patient from "../../models/patients.js";
import Report from "../../models/reports.js";


// for patient request
export async function getAllReports(req, res)
{
    try
    {
        let patient = await Patient.findOne({phoneNumber:req.body.phoneNumber});
        if(patient)
        {
            // populate function fetches data from linked models like here from doctor and patient
            let patientReports = await Report.find({patient: patient._id})
            .populate('doctor', 'name')
            .populate('patient', 'name');

            if (patientReports.length > 0) 
            {
                // Construct the response JSON
                let responseData = patientReports.map((report) => (
                {
                    "Doctor Name": report.doctor.name,
                    "Patient Name": report.patient.name,
                    "Status": report.status,
                    "Date": report.date
                }));
        
                return res.status(200).json(
                {
                    status: "success",
                    message: "This is a list of your reports",
                    data: responseData
                });
            } 
            else 
            {
                return res.status(200).json(
                {
                    status: "success",
                    message: "You don't have any reports",
                    data: []
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

export async function getAllPatients(req, res)
{
    try
    {
        if(req.user)
        {
            let patientsList = await Patient.find();

            // patients found
            if(patientsList.length > 0 )
            {

                let responseData = patientsList.map((patient) => (
                {
                    "patient Id" : patient._id,
                    "patient Name": patient.name,
                    "patient Number" : patient.phoneNumber
                }));
        
                return res.status(200).json(
                {
                    status: "success",
                    message: "All Patients List",
                    data: responseData
                });
            }
            else
            {
                return res.status(200).json(
                {
                    status: "success",
                    message: "Not Found Any Patient",
                    data: []
                });
            }
        }
    }
    catch(error)
    {
        console.log('Error in geting patients list :', error);
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
        if(!(req.body.phoneNumber.length === 10))
        {
            return res.status(400).json(
            {
                status: 'error',
                message: "Invalid phone number length. Phone number must have exactly 10 digits."
                
            });
        }
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

        // console.log("patient Report : ", patientReport);
        console.log(patientReport);
        return res.status(201).json(
            {
                "status": "success",
                "message": "this is the report of patient",
                data:
                {
                    "patient name": patientReport.patient,
                    "doctor name": patientReport.doctor.name,
                    "status": patientReport.status,
                    "date": patientReport.date
                }
            }
        );
    }
    catch(error)
    {
        console.log('Error in registering new patient' , error);
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
        let patient = await Patient.findById({ _id: req.params.id });

        if (!req.user._id || !patient) 
        {
            return res.status(400).json(
            {
                "error": "Bad Request",
                "message": "Missing Patient Details"
            });
        } 
        else 
        {

            // Validate the user input and ensure it's one of the allowed enum values
            const {status} = req.body;

            if (!['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'].includes(status)) 
            {
                return res.status(400).json({
                    status: "error",
                    message: 'Invalid status value, status only take these values [Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit]'
                });
            }

            // Create a new report with the validated status value
            const newReport = await Report.create(
            {
                doctor: req.user._id,
                patient: patient._id,
                status: status,
            });

            let updatePatient = await Patient.findByIdAndUpdate(patient._id, {$push: {myReports:newReport._id}});

            if(updatePatient)
            {
                return res.status(201).json(
                {
                    status: 'success',
                    message: 'Patient report is created',
                    data: newReport
                });
            }
            else
            {
                return res.status(201).json(
                {
                    status: 'error',
                    message: 'Error in updating patients myReports array ',
                });
            }
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
