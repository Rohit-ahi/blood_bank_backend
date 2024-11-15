
const nodemailer = require('nodemailer')

const adminmail = 'ahirwarrohit0206@gmail.com'
const password = 'dszm yvbg oarw dvdi'

async function email_fun(email,emaildesign,sub) {
       console.log('emaildesign',emaildesign)
     try {
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                user : adminmail,
                pass : password
            }
       })
 
     const mailOptions = {
          from : adminmail,
          to : email ,
          subject: sub ,
          html : emaildesign,
 
     }
      const info = await transporter.sendMail(mailOptions)
      return info

     } catch (error) {
         throw error
     }

}

module.exports = {email_fun}