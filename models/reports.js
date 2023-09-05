import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
{
    doctor: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    patient: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    status: 
    {
        type: String,
        enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'],
        required: true,
    },
    date: 
    {
        type: Date,
        default: Date.now,
    },
},
{
    timestamps: true
});

const Report = mongoose.model('Report', reportSchema);

export default Report;
