import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: 
    {
        type: String,
        required: true
    },
    email: 
    {
        type: String,
        required: true,
        unique: true
    },
    password: 
    {
        type: String,
        required: true
    },
    role: 
    {
        type: String,
        default: "doctor",
        immutable: true // "this means you can not change this value"
    }
},
{
    timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
