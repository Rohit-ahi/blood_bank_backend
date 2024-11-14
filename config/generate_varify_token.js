

require('dotenv').config()
const jwt = require('jsonwebtoken')

const secret_key = process.env.jwt_secret
const expiry = '200m'


function generate_token(userid,role) {
      const token = jwt.sign({userid,role},secret_key,{expiresIn:expiry})
      return token
} 

function token_varify(token,callback) {
       jwt.verify(token,secret_key,(err,tokendata)=>{
            if(err) {
                  callback(err,null)
            }
            callback(null,tokendata)
       })
}

module.exports = {generate_token,token_varify}

