

const express=require('express')
const fileupload = require('express-fileupload')
const cors = require('cors')
const path = require('path')
require('dotenv').config()


const basicrouter = require('./routers/basicrouter')


const server = express()
server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use(cors())
server.use(fileupload())

server.use('/basicrouter', basicrouter)




server.use((req,res)=>{
       res.json('Wrong URL')
})

const PORT = process.env.PORT || 9898
server.listen(PORT,()=>{
     console.log(`server is runing at http://localhost:${PORT}`);
     
})