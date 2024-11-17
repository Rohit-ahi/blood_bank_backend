

const router = require('express').Router()

const ApiResponse = require('./helpers/apiresponse.js')
const {User,DonorInfo, sequelize} =  require('../models')
const {check_password, password_bcrypt, varify_password} = require('./helpers/password.js')
const {generate_token,token_varify} = require('../config/generate_varify_token.js')
const { email_fun } = require('../config/email.js')
const { htmlfun, htmlfun2 } = require('../config/mail_design.js')


require('dotenv').config()

router.post('/donor_reg',async(req,res)=>{

    const t = await sequelize.transaction()

    try {

        const data = req.body
        const {email,name,mobile,gender,bloodGroup} = data

        const userexist = await User.findOne({where:{email}})
        const donorexist = await DonorInfo.findOne({where:{mobile}})
        
        if(userexist && donorexist) {
            return res.json(new ApiResponse(false,'User already exist'))
        }
        if(userexist && donorexist === null) {
            return res.json(new ApiResponse(false,'email already exist'))
        }
        if(userexist === null && donorexist) {
            return res.json(new ApiResponse(false,'mobile already exist'))
        }

        const userdata = {email,role:'donor',status:false}
        const user = await User.create(userdata,{transaction:t})
        
        await DonorInfo.create({name,mobile,gender,bloodGroup,user:user.id},{transaction:t})
        const token = generate_token(user.id,user.role)

        const html_1 = htmlfun(name)
        const html_2 = htmlfun2(token,name)

        await Promise.all([
            email_fun(email,html_1,'Welcome to Pulse Donar'),
            email_fun(email,html_2,'Pulse Donar Verification')
        ])
        
        await t.commit()
        res.json(new ApiResponse(true,"Registration Successfully. Please verify your email."))

    } catch (error) {
         await t.rollback()
         res.json(new ApiResponse(false,'Registration Failed',error.message))
         console.log(error)
    }
})


router.put('/varify_email/:token',async(req,res)=>{
        
        const t = await sequelize.transaction()
        const token = req.params.token
        if(!token) {
           return res.status(400).json(new ApiResponse(false,'No Token Found'))
        }

    try {

        token_varify(token,async(err,tokendata)=>{

            if(err) {
              return  res.json(new ApiResponse(false,"Expire Or Invalid Token"))
            }
            const userid = tokendata.userid

            const {password,DOB,loc_lat,loc_long,tracker_area} = req.body

            if(!check_password(password)) {
               return res.json(new ApiResponse(false,"password must be between 7 and 14 characters long"))
            }
            const hashpass = await password_bcrypt(password)
           
            const user = await User.findOne({where:{id:userid}})
            if(!user) {
               return res.json(new ApiResponse(false,"User Not found"))
            }
            if(user.status) {
                 return res.json(new ApiResponse(false,"User is already Registered and Verify "))
            }
            const userdata = {hashpass,status:true}
            await user.update(userdata,{transaction:t})
            await DonorInfo.update({DOB,loc_lat,loc_long,tracker_area,},{where:{user:userid}},{transaction:t})
            await t.commit()
            return res.json(new ApiResponse(true,'Email verified successfully'))
       })
       
    } catch (error) {
            await t.rollback()
            console.error('error :',error.message)
            return res.json(new ApiResponse(false,"email varification failed"))
       }           
})


router.post('/login',async(req,res)=>{

    const{email,password} = req.body
    if(!check_password(password)) {
       return res.json(new ApiResponse(false,'password must be between 7 and 14 characters long'))
    }
    
    try {

        const user = await User.findOne({where:{email}})
        if (!user) {
            return res.status(404).json(new ApiResponse(false, 'User not found'));
        }
        if(!user.status) {
             return res.status(403).json(new ApiResponse(false,'Account is not Activated'))
        }

        const ispass_correct = await varify_password(password,user.password)
        if(!ispass_correct) {
            return res.status(401).json(new ApiResponse(false,'Incorrect password'))
        }

        const token = generate_token(user.id,user.role)
        const userid = user.id
        const role = user.role
        return res.json(new ApiResponse(true,"Correct Email And Password",{token,userid,role}))
        
    } catch (error) {
        console.error('error:',error)
         res.status(500).json(new ApiResponse(false,'Login failed',error.message))
    }

})


router.post('/resend_verifylink',async(req,res)=>{
        const {email} = req.body

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json(new ApiResponse(false, "Invalid email format"));
        }
        const user = await User.findOne({where:{email}})
        if(!user) {
            return res.status(404).json(new ApiResponse(false,"User Invalid"))
        }
        if(user.status) {
            return res.status(400).json(new ApiResponse(false,"User Already Verified"))
        }

        const tokenValidityDuration = 15 * 60 * 1000; // 15 minutes
        const currentTime = new Date().getTime();
        const lastSentTime = new Date(user.lastVerificationSent).getTime();

        if (lastSentTime && currentTime - lastSentTime < tokenValidityDuration) {
             return res.status(400).json(new ApiResponse(false, "Token is still valid. No need to resend."));
        }

    try {
            
            const token = generate_token(user.id,user.roll) 
            const html_2 = htmlfun2(token,user.name)
            await  email_fun(email,html_2,'Pulse Donar Verification')

            user.lastVerificationSent = new Date();
            await user.save();
            return res.status(200).json(new ApiResponse(true,"Verification link sent. Please verify your email."))

    } catch (error) {
         res.status(500).json(new ApiResponse(false,"Failed to resend verification link. Please try again later."))    
    }    
})




module.exports = router