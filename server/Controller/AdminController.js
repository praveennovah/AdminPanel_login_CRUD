import Admin from "../Model/AdminModel.js"

export const login = async (req,res)  =>{
    const {username,password}=req.body;
    try{
        console.log(username,password);
        const admin = await Admin.findOne({username});
        console.log(admin);
        if(!admin){
            return res.status(401).json({ success: false, message: 'Invalid username' });
          }
        if(password === admin.password){
            return res.status(200).json({ success: true, message: 'login Successful' });
        }
        else{
            return res.status(402).json({ success: false, message: 'Invalid password' });
        }
    }
    catch(err){
        return res.status(505).json({ success: false, message: 'login failed' });
        }
    }
