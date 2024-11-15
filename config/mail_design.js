
require('dotenv').config()

function htmlfun(name) {
  if(!name) {
    throw new Error("Name is missing!");
  }
  return `  <!DOCTYPE html>
     <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Email</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <tr>
            <td align="center" bgcolor="#ff0000" style="padding: 20px 0;">
                <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Welcome to Pulse Donar!</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center;">
                <h2 style="color: #333; font-size: 20px;">Hello, ${name}</h2>
                <p style="color: #666; font-size: 16px; line-height: 1.5;">
                    We are thrilled to have you with us. Thank you for signing up for our service. We're excited to help you get started and be part of your journey.
                </p>
                <p style="color: #666; font-size: 16px; line-height: 1.5;">
                    To get the most out of our service, feel free to check out our resources, tutorials, and support options. If you ever have any questions, don’t hesitate to reach out to us.
                </p>
                <a href="https://yourwebsite.com" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: rgb(255, 0, 0); color: #ffffff; text-decoration: none; border-radius: 5px;">
                    Visit Our Website
                </a>
            </td>
        </tr>
        <tr>
            <td style="background-color: #f4f4f4; padding: 10px; text-align: center; color: #999; font-size: 14px;">
                <p>© 2024 Pulse Donar, Inc. All rights reserved.</p>
                <p><a href="https://yourwebsite.com/unsubscribe" style="color: #007bff; text-decoration: none;">Unsubscribe</a></p>
            </td>
        </tr>
    </table>
</body>
</html>
`
}


function htmlfun2(token,name) {
   if(!(token && name)) {
      throw new Error("Name is missing!");
   }
 return ` <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Email</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <tr>
            <td align="center" bgcolor="#ff0000" style="padding: 20px 0;">
                <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Pulse Donar Verification!</h1>
            </td>
        </tr>
        
        <tr>
            <td style="padding: 20px; text-align: center;">
                <h2 style="color: #333; font-size: 20px;">Hello, ${name}</h2>
                <p style="color: #666; font-size: 16px; line-height: 1.5;">
                    Please Verify your Email through given verification link.
                </p>
                <p style="color: #666; font-size: 16px; line-height: 1.5;">
                   <a href="http://localhost:${process.env.PORT}/varify/${token}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: rgb(255, 0, 0); color: #ffffff; text-decoration: none; border-radius: 5px;">Verify</a>
                </p>
            </td>
        </tr>
        
        <tr>
            <td style="background-color: #f4f4f4; padding: 10px; text-align: center; color: #999; font-size: 14px;">
                <p>© 2024 Pulse Donar, Inc. All rights reserved.</p>
                <p><a href="https://yourwebsite.com/unsubscribe" style="color: #007bff; text-decoration: none;">Unsubscribe</a></p>
            </td>
        </tr>
    </table>
</body>
</html>`

}


module.exports = {htmlfun,htmlfun2}