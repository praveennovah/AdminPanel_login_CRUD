import express from "express"
import { CreateEmployee,GetoneEmployee,AllEmployee,UpdateEmployee,DeleteEmployee} from "../Controller/EmployeeController.js";
const router = express.Router(); 
import {upload} from "../middleware/MulterConfig.js"

router.post("/createEmployee",upload.single('img'),CreateEmployee);

router.get("/getEmployee/:id",GetoneEmployee);

router.get("/", AllEmployee);

router.put('/updateEmployee/:id', upload.single('img'), UpdateEmployee);

router.delete("/deleteEmployee/:id",DeleteEmployee);


export default router;
  