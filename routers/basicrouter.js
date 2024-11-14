

const router = require('express').Router()

const ApiResponse = require('./helpers/apiresponse.js')
const {User,DonorInfo, sequelize} =  require('../models')
const {check_password} = require('./helpers/validators.js')
const nodemailer = require('nodemailer')
const {generate_token} = require('../config/generate_varify_token.js')
const {token_varify} = require('../config/generate_varify_token.js')

require('dotenv').config()


router.post('/donor_reg',async(req,res)=>{

    const t = await sequelize.transaction()

    try {

        const data = req.body
        const {email,name,mobile,gender,bloodGroup} = data
       
        const userdata = {email,role:'donor',status:false}
        const user = await User.create(userdata,{transaction:t})

        await DonorInfo.create({name,mobile,gender,bloodGroup,user:user.id},{transaction:t})
        const token = generate_token(user.id,user.role)
       

        const transporter = nodemailer.createTransport({
               service:'gmail',
               auth: {
                   user: 'ahirwarrohit0206@gmail.com',
                   pass: 'cvcc dscu rnfb ifpr'
               }
        })

        const varification_link = `http://localhost:${process.env.PORT}/varify?token=${token}`

        const mailOptions = {
            from :'ahirwarrohit@gmail.com',
            to :email,
            subject : "Email varification",
            html : `<P>Hi ${name},</P>
                    <P>Thank you for registering.Please verify your email by clicking the link below: </P>
                     <a href="${varification_link}">Verify your email</a> `
        }
 
        const sendMail = await transporter.sendMail(mailOptions)
        await t.commit()
        res.json(new ApiResponse(true,"Registration Successfully. Please verify your email.",token))

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
           return res.json(new ApiResponse(false,'No Token Found'))
        }
        
    try {

        token_varify(token,async(err,tokendata)=>{

            if(err) {
              return  res.json(new ApiResponse(false,"Expire Or Invalid Token"))
            }
            const userid = tokendata.userid

            const {password,DOB,loc_lat,loc_long,tracker_area} = req.body
            if(check_password(password)) {
               return res.json(new ApiResponse(false,"password must be between 6 and 14 characters long"))
            }
            
            const user = await User.findOne({where:{id:userid}})
            if(!user) {
               return res.json(new ApiResponse(false,"User Not found"))
            }
            const userdata = {password,status:true}
            await user.update(userdata,{transaction:t})
            await DonorInfo.update({DOB,loc_lat,loc_long,tracker_area,},{where:{user:userid}},{transaction:t})
            await t.commit()
            return res.json(new ApiResponse(true,'Email verified successfully'))
       })
       
    } catch (error) {
            await t.rollback()
            return res.json(new ApiResponse(false,"failed email varified"))
       }           
})


router.post('/login',async(req,res)=>{

    try {

        const{email,password} = req.body

        if(check_password(password)) {
            res.json(new ApiResponse(false,'password must be between 6 and 14 characters long'))
        }

        const user = await User.findOne({where:{email,password}})
        if(!(user || user.status)) {
            res.json(new ApiResponse(false,'Inavlid Email or Password'))
        }

        const token = generate_token(user.id,user.role)
        const userid = user.id
        const role = user.role
        res.json(new ApiResponse(true,"Correct Email And Password",{token,userid,role}))

    } catch (error) {
         res.json(new ApiResponse(false,'Failed Login',error.message))
    }

})






module.exports = router