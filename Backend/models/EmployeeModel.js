import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    joiningDate: { type: Date, required: true },
});

export default mongoose.model('Employee', EmployeeSchema);
