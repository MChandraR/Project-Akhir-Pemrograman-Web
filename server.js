const express = require('express');
const createServer = require('http').createServer
//Inisialisasi Server
const app = express()
const server = createServer(app, {});

//Routing
//Get untuk mengambil data dari server
//Post biasany untuk mengirim data ke server
//Put biasanya untuk update data
//Delete delete data
app.use(express.json());

app.get('/', (req, res)=>{
    res.send({
        "status" : 200, 
        "message" : "berhasil mengambil data",
        "data" : {
            "nama" : "Chandra", 
            "nim" : "nim"
        }
    });
});

app.listen(3000, (e)=>{
    console.log("Server start");
});