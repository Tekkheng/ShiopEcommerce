import express from "express";
import Users from "../models/users.js";
import path from "path";
import fs from "fs";
import argon2 from "argon2";


const getUser = async(req,res)=>{
    try{
        const data = await Users.findAll({
            attributes: ['id','uuid','url','name','email','role'],
        });
        return res.status(200).json({status: 'success',data});
    }catch(err){
        return res.status(500).json({status: 'fail', msg: 'server error', serverMsg: err.message })
    }
}


const getUserById = async (req,res)=>{
    try{
        const data = await Users.findOne({
            attributes: ['id','uuid','url','name','email','role'],
            where: {
                uuid: req.params.id,
            }
        });
        if(!data) return res.status(404).json({status: 'fail',msg: 'data tidak ditemukan!'});
        return res.status(200).json(data);
    }catch(err){
        return res.status(404).json({status: 'fail',msg:'server error', serverMsg: err.message});
    }
}

const addUser = async(req,res)=>{
    let urlImage = null;
    let image = null;
    let role = null;
    const { name,email,password,confPassword} = req.body;
    role = req.body.role;
    
    if(role === null || role === undefined){
        role = "users";
    }
    
    const user = await Users.findAll({
        attributes: ["email","image"],
    });
    
    if(!name) return res.status(404).json({msg: 'field Name harus disi!'});
    if(!email) return res.status(404).json({msg: 'field Email harus disi!'});
    if(!password) return res.status(404).json({msg: 'field Password harus disi!'});
    if(!confPassword) return res.status(404).json({msg: 'field Confirm Password harus disi!'});

    if(password !== confPassword) return res.status(400).json({msg: 'Password dan confirm Password tidak cocok!'})
    const hashPassword = await argon2.hash(password);
    
    if(req.files === null || req.files === undefined){
        image = 'profile.png';
        urlImage = `${req.protocol}://${req.get('host')}/${image}`;
    }else{
        const file = req.files.image;
        const filesize = file.data.length;
        const extension = path.extname(file.name);
        image = file.md5 + extension;
        const allowedType = ['.jpg','.png','.jpeg'];
        urlImage = `${req.protocol}://${req.get("host")}/profileImages/${image}`;

        if(!allowedType) return res.status(422).json({status: 'fail', msg: 'invalid image'});
        if(filesize > 5000000) return res.status(422).json({status: 'fail', msg: 'file size tidak boleh lebih dari 5mb'});
        
        file.mv(`./public/profileImages/${image}`,(err)=>{
            if(err) return res.status(422).json({msg:err.message});
        });
    }

    for(let i of user){
        if(i.email === email) return res.status(400).json({msg: 'email sudah terdaftar,silahkan menggunakan email lain!'});
        
        if(image !== "profile.png"){
            if(i.image === image) return res.status(400).json({msg: 'image sudah terpakai,silahkan menggunakan image lain!'});
        }
    }
    
    try{
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role,
            image: image,
            url: urlImage,
        });
        return res.status(201).json({status: 'success', msg: 'register berhasil'});
    }catch(err){
        return res.status(400).json({status: 'fail', msg: 'register gagal',serverMsg: err.message});
    }
    
    
}


const editUserById = async (req,res)=>{
    const user = await Users.findOne({
        where: {
            id: req.params.id,
        },
    });
    let image = "";
    let urlImage = '';
    if(req.files === null){
        image = user.image;
        urlImage = `${req.protocol}://${req.get("host")}/profileImages/${image}`;
    }else{
        const file = req.files.image;
        const filesize = file.data.length;
        const ext = path.extname(file.name);
        image = file.md5 + ext;
        const allowedType = ['.jpg','.png','.jpeg'];
        
        if(!allowedType) return res.status(422).json({status:'fail', msg: 'invalid image'});
        if(filesize > 5000000) return res.status(422).json({status:'fail', msg: 'file tidak boleh lebih dari 5mb!'});
        
        if(user.image !== "profile.png"){
            const imagePath = `./public/profileImages/${user.image}`;
            fs.unlinkSync(imagePath);
            file.mv(`./public/profileImages/${image}`,(err)=>{
                if(err) return res.status(500).json({msg: err.message});
            });
            urlImage = `${req.protocol}://${req.get("host")}/profileImages/${image}`;
        }else{
            file.mv(`./public/profileImages/${image}`,(err)=>{
                if(err) return res.status(500).json({msg: err.message});
            });
            urlImage = `${req.protocol}://${req.get("host")}/profileImages/${image}`;
        }
    }
    const { name,email } = req.body;
    let role = null;
    role = req.body.role;
    if(role === null || role === undefined){
        role = "users";
    }
    
    let hashPassword;
    let password = null;
    let confPassword = null;
    
    password = req.body.password;
    confPassword = req.body.confPassword;
    
    if(password === '' || password === null){
        hashPassword = user.password;
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: 'password dan confirm password tidak cocok!'});
    
    try{
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role,
            image: image,
            url: urlImage,
        },{
            where: {
                id: user.id,
            },
        });
        return res.status(201).json({status:'success', msg: 'berhasil edit data'});
    }catch(err){
        return res.status(500).json({status:'fail', msg: 'server eror',serverMsg: err.message});
    }
}

const editUserProfile = async(req,res)=>{
    const profile = await Users.findOne({
        where: {
            uuid: req.params.uuid,
        },
    });
    if(!profile) return res.status(404).json({msg:"data profile tidak ditemukan!"});
    
    let imageFile = "";
    let urlImage = "";
    
    const validasiData = await Users.findAll({
        attributes:["email","image"],
    });
    
    if(req.files === null){
        imageFile = profile.image
        if(profile.image === "profile.png"){
            imageFile = "profile.png";
            urlImage = `${req.protocol}://${req.get("host")}/${imageFile}`;
        }else{
            urlImage = `${req.protocol}://${req.get("host")}/profileImages/${imageFile}`;
        }
    }else{
        const file = req.files.image;
        const filesize = file.data.length;
        const ext = path.extname(file.name);
        imageFile = file.md5 + ext;
        const allowedType = ['.jpg','.png','.jpeg'];
        
        if(!allowedType) return res.status(422).json({status:'fail', msg: 'invalid image'});
        if(filesize > 5000000) return res.status(422).json({status:'fail', msg: 'file tidak boleh lebih dari 5mb!'});
        
        if(profile.image !== "profile.png"){
            for(let i of validasiData){
                if(i.image === imageFile) return res.status(400).json({msg: 'Image sudah terpakai, silahkan menggunakan image lain!'});
            }
            const imagePath = `./public/profileImages/${profile.image}`;
            fs.unlinkSync(imagePath);
            file.mv(`./public/profileImages/${imageFile}`,(err)=>{
                if(err) return res.status(500).json({msg: err.message});
            });
            urlImage = `${req.protocol}://${req.get("host")}/profileImages/${imageFile}`;
        }else{
            file.mv(`./public/profileImages/${imageFile}`,(err)=>{
                if(err) return res.status(500).json({msg: err.message});
            });
            urlImage = `${req.protocol}://${req.get("host")}/profileImages/${imageFile}`;
        }
    }

    let {name,email} = req.body;

    for(let i of validasiData){
        if(i.email === email) return res.status(400).json({msg:"Email sudah terdaftar, silahkan menggunakan email lain!"});
    }
    
    if(!name){
        name = profile.name;
    };
    if(!email){
        email = profile.email;
    };
    try{
        await Users.update({
            name: name,
            email: email,
            password: profile.password,
            role: profile.role,
            image: imageFile,
            url: urlImage,
        },{
            where: {
                uuid: profile.uuid
            }
        });

        return res.status(201).json({status: 'success', msg: "Berhasil Edit Profile"});
    }catch(err){
        return res.status(404).json({status:'fail', msg:err.message})
    }
}

const deleteUserById = async (req,res)=>{
    const user = await Users.findOne({
        where: {
            id: req.params.id,
        },
    });
    if(!user) return res.status(404).json({status: 'fail', msg: 'data user yang mau dihapus, tidak ditemukan'});

    if(user.image !== "profile.png"){
        const imagePath = `./public/profileImages/${user.image}`;
        fs.unlinkSync(imagePath);
    }
    try{
        await Users.destroy({
            where: {
                id: user.id,
            },
        });
        return res.status(201).json({status: 'success', msg: 'berhasil hapus data users'});
    }catch(err){
        return res.status(500).json({status: 'fail', msg: 'gagal hapus data users',serverMsg: err.message});
    }

}
export { getUser, getUserById, addUser, editUserById, deleteUserById, editUserProfile }

