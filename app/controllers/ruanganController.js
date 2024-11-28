const Ruangan = require('../models/ruangan');
const View = require('../../utils/views').view;
const Response = require('../../utils/utils').sendResponse;
const resourceController = require('./resourceController');
const Validator = require('../../utils/validator');


class ruanganController {

    async index(req,res){
        Response(res,200, "Berhasil mengambil data ruangan !", await Ruangan.get());
    };

    async addRuangan(req,res){
        await resourceController.roomUpload.single('file')(req, res, async(err) => {
            if (err) return Response(res, 400, "File Upload Error !", err.message);
            if (!req.file) return Response(res, 400, "No file uploaded !",null);

            const data = req.body;
            const file = req.file;

            if(Validator(data.room_id) && Validator(data.room_name) && Validator(data.description) && Validator(data.capacity)){
                var originalName = file.originalname;
                resourceController.rename(originalName, data.room_id + ".png" );
                return Response(res, 200, "Berhasil menambahkan data ruangan !", await Ruangan.create({
                    room_id : data.room_id,
                    room_name : data.room_name,
                    description : data.description,
                    capacity : data.capacity
                }));
            }
    
            return Response(res, 400, "Gagal menambahkan data ruangan !", null);

        });
        
    
    }

    async updateRuangan(req,res){
     
        
        await resourceController.roomUpload.single('file')(req, res, async(err) => {

            const update = {};
            const data = req.body;
            
            if(!Validator(data.room_id)){
                return Response(res, 400, "Gagal mengupdate data ruangan : room_id tidak ditemukan !" );
            }
            
            if(!err && req.file){
                const file = req.file;
                var originalName = file.originalname;
                resourceController.rename(originalName, data.room_id + ".png" );
            }
            if(Validator(data.room_name))update["room_name"] = data.room_name;
            if(Validator(data.description))update["description"] = data.description;
            if(Validator(data.capacity))update["capacity"] = data.capacity;
            return Response(res, 200, "Berhasil mengupdate data ruangan !", await Ruangan.where({room_id : data.room_id}).update(update));
        });

    }   


    async deleteRuangan(req,res){
        const data = req.body;
        resourceController.deleteFile(data.room_id + ".png");
        Response(res, 200, "Berhasil menghapus data ruangan !", await Ruangan.where({room_id : data.room_id}).delete());
    }
}

module.exports = new ruanganController();