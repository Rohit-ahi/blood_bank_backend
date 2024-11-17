
const router = require('express').Router()

const ApiResponse = require('./helpers/apiresponse')
const {token_varify} = require('../config/generate_varify_token')

const donor = require('./donor')

router.use((req,res,next)=>{
      const tokenheader = req.headers.authorization
      if(!tokenheader) {
          return res.status(401).json(new ApiResponse(false,"No token found"))
      }

      const token = tokenheader.split(' ')[1]
      token_varify(token,(err,tokendata)=>{
          if(err) {
              return res.status(400).json(new ApiResponse(false,'Token Expiry or Invalid'))
          }
          const userid = tokendata.userid
          const role = tokendata.role
          req.userinfo = {userid,role}
          next()
      })
})

router.use('/donor',donor)


module.exports = router