import Employee from "../Model/EmployeeModel.js";
import path from "path"
import fs from "fs"


export const CreateEmployee = async (req,res) =>{
    try {
        const { name, email, mobile, designation, gender, courses, img } = req.body;
        const  existing_employee = await Employee.findOne({email});
        if(existing_employee){
            res.status(301).json({message : "Employee already Exist"})
        }
        else{
            const newEmployee = Employee({ 
                name,
                email,  
                mobile, 
                designation,
                gender,
                courses,
                img : req.file ? req.file.filename : req.body.img,
            }); 
            const result = await newEmployee.save();
            res.status(201).json(result); 
        }
        
      } catch (err) {
        res.status(500).json({ message: 'Error creating Employee', error: err }); 
      }
} 

export const GetoneEmployee = async (req,res) =>{
    const {id} = req.params;
    try{
        const getEmployeeById = await Employee.findById(id);
        res.status(200).json(getEmployeeById);
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error');
    }
}

export const AllEmployee = async (req,res)=>{
    try{
        const getAllEmployee = await Employee.find({});
        res.status(201).json(getAllEmployee); 
    }
    catch(err){
        console.log(err)
    }
} 


export const UpdateEmployee = async (req, res) => {
    const { name, email, mobile, designation, gender, courses, img } = req.body;
    const { id } = req.params;
    try {
        console.log('Request Body:', req.body);
        console.log('Request Body:', req.file);
        const existingEmployee = await Employee.findById(id);
        if (!existingEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
          }
        
          let imageFilename = existingEmployee.img; 
          if (req.file) {
             if (imageFilename) {
                 fs.unlinkSync(path.join(__dirname, 'uploads', imageFilename)); 
                } 
                imageFilename = req.file.filename;
          }
          const updatedEmployeeData = {
             name, 
             email, 
             mobile, 
             designation, 
             gender, 
             courses, 
             img: imageFilename, 
            };
            console.log('Updating Employee with data:', updatedEmployeeData);
            const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedEmployeeData, { new: true });
            console.log('Updated Employee:', updatedEmployee);
            res.status(200).json(updatedEmployee);
    } catch (err) {
      res.status(500).json({ message: 'Error updating employee', error: err });
    }
  };
  

export const DeleteEmployee = async (req,res) =>{

    const {id}=req.params;
    try {
        const DeleteEmployee = await Employee.findByIdAndDelete({_id:id})
        res.status(201).json(DeleteEmployee); 
      } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err }); 
      }

}