// Backend para requisições da api
require('dotenv').config()
const express = require('express')
const server = express();
const axios = require('axios')
const cors = require('cors')

const apilink = process.env.APIKEY

server.use(cors())
server.use(express.json())

server.post('/req', async (req, res)=>{
    try{
    const {city} = req.body
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${encodeURIComponent(apilink)}&lang=pt-br&units=metric`
    const response = await axios.get(url)
        res.json(response.data)
        console.log(response.data)
       
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Error calling APi'})
    }
    
})


server.listen(3000, console.log('Server running at port 3000'))