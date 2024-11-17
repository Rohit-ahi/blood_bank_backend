

const ApiResponse = require('./helpers/apiresponse')
const router = require('express').Router()
const {User} = require('../models')
const { varify_password, check_password, password_bcrypt } = require('./helpers/password')

router.use((req,res,next)=>{
     const role = req.userinfo.role
     if(role === "donor"){
        next()
     }else {
        return res.status(400).json(new ApiResponse(false,'Anauthorized Access'))
     }   
})


router.post('/password_change',async(req,res)=>{
    const {oldpassword,newpassword} = req.body
    const userid = req.userinfo.userid

try {

    if(! (oldpassword && newpassword)) {
        return res.status(400).json(new ApiResponse(false,'Both old and new passwords are required.'))
    }
    const user = await User.findOne({where:{id:userid}})
    if(!user) {
        return res.status(404).json(new ApiResponse(false,'User Not Found'))  
    }

    const ismatch = varify_password(oldpassword,user.password) 
    if(!ismatch)  {
        return res.status(401).json(new ApiResponse(false,'old Password is Incorrect'))
    }
    if(!check_password(newpassword)) {
        return res.status(400).json(new ApiResponse(false,"password must be between 7 and 14 characters long"))
    }
    const hash_newpassword = await password_bcrypt(newpassword)
    await user.update({password:hash_newpassword})
    return res.status(200).json(new ApiResponse(true,'Password Changed Successfully')) 

    } catch (error) {
       console.error('error :',error.message)
       res.status(500).json(new ApiResponse(false,'password changed failed'))
    }
})


  router.post('/update_profile',async(req,res)=>{
       const {name,mobile,DOB,} = req.body
       const userid = req.userinfo.userid 
    try {

        if (!/^\d{10}$/.test(mobile)) {
            return res.status(400).json(new ApiResponse(false, 'Invalid mobile number format.'));
        }
         const user = await User.findOne({where:{id:userid}})
         if(!user) {
            return res.status(404).json(new ApiResponse(false,'User Not Found'))
        }
         await user.update({name,mobile,DOB})
           res.status(200).json(new ApiResponse(true,"Successfully Profile Update"))
       } catch (error) {
           console.error('Error updating profile:', error.message);
           res.status(500).json(new ApiResponse(false,"Failed Profile Update , Try again"))
       }
  }) 

  
  

module.exports = router