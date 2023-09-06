import Doctor from '../../models/doctors.js';
import Patient from '../../models/patient.js';
import Report from '../../models/reports.js';

export async function createReport(req, res)
{
    return res.status(201).json(
        {
            "status" : "success",
            "message" : "this is report",
        }
    )
}