import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
{
    name:
    {
        type: String,
        required: true
    },
    phoneNumber:
    {
        type: String,
        required: true,
        unique: true,
        min: [10, 'to short (min length 10 )'],
        max: 10
    }
},
{
    timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;