import Users from "../models/users.js"
import argon2 from "argon2"

const Login = async(req,res) =>{
    try{
        // mendaptkan data user dari input email = email di database
        const user = await Users.findOne({
            where: {
                email: req.body.email,
            },
        });
        if(!user) return res.status(404).json({msg: 'user tidak ditemukan!'});
        
        // mencocokkan pw user di database = pw input
        const verify = await argon2.verify(user.password, req.body.password);
        if(!verify) return res.status(400).json({msg: 'wrong password'});
        
        // membangun session = user.uuid
        req.session.userId = user.uuid;
    
        // mendapatkan info user dri database
        const uuid = user.uuid;
        const name = user.name;
        const email = user.email;
        const role = user.role;
        
        // tampilkan data login
        return res.status(200).json({uuid,name,email,role});
    }catch(err){
        console.log(err);
    }
}

const Me = async(req,res) =>{
    try{
        if(!req.session.userId) return res.status(201).json({msg: 'Silahkan Login ke akun anda terlebih dahulu!'});
        const user = await Users.findOne({
            attributes: ['id','uuid','name','email','role','url'],
            where: {
                uuid: req.session.userId,
            },
        });
        if(!user) return res.status(404).json({msg:'user tidak ditemukan!'});
        return res.status(200).json(user);
    }catch(err){
        console.log(err);
    }
}

const Logout = async(req,res) =>{
    try{
        req.session.destroy((err)=>{
            if(err) return res.status(400).json({msg: 'tidak dapat logout!'});
            return res.status(200).json({msg: 'Anda telah logout'});
        });
    }catch(err){
        console.log(err);
    }
}

export { Login,Me,Logout }
