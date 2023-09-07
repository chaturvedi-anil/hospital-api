import Report from '../../models/reports.js';

export async function getPatientReportsByStatus(req, res)
{
    try
    {
        // Validate the user input and ensure it's one of the allowed enum values
        const status = req.params.status;

        if (!['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'].includes(status)) 
        {
            return res.status(400).json({
                status: "error",
                message: 'Invalid status value, status only take these values [Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit]'
            });
        }  

        let patientReports = await Report.find({status: req.params.status})
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
                message: "This is a list of patient reports based on their status",
                data: responseData
            });
        } 
        else 
        {
            return res.status(200).json(
            {
                status: "success",
                message: "Patient does not exist of this status",
                data: []
            });
        }
    }
    catch(error)
    {
        console.log('Error in geting patient report by status from reportscontroller :', error);
        return res.status(500).json
        (
            {
                status: 'error',
                message: 'Internal server error',
            }
        );
    }
}