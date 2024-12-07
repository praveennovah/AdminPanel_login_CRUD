import mongoose from "mongoose"

const EmployeeSchema = new mongoose.Schema(
    { 
    name: {
         type: String, 
         required: true 
        }, 
    email: { 
        type: String,
        required: true,
        unique: true 
    },
    mobile:{
         type: String,
         required: true 
        },
    designation: { 
        type: String, 
        default: '' 
    },
    gender: { 
        type: String, 
        enum: ['Male', 'Female', 'Other'],
        required: true 
    },
    courses: {
        type: [String],
        required: true 
    }, 
    img: {
        type: String,
        required: false 
    }
     },
    { 
    timestamps: true 
    }
    );

const Employee = mongoose.model("Employee",EmployeeSchema);

export default Employee;