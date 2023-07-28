import Product from "../models/product.js";

// untuk mendaptkan extension image
import path from "path";
// untuk menghapus image pada folder public images
import fs from "fs";


const getAllProducts = async(req,res)=>{
    try{
        const response = await Product.findAll();
        return res.status(200).json({
            status: 'success',
            data:{
                response,
            }
        })
    }catch(err){
        return res.status(500).json({
            status: "fail",
            msg: 'server error',
            serverMsg: err.message,
        })
    }
}

const addProduct = async(req,res)=>{
    // jika req.files ga di isi user return pesan no file uploaded
    if(req.files === null) return res.status(400).json({msg: 'no file uploaded'});
    const { name, price, description } = req.body;
    // const createdAt = new Date().toISOString();
    // const updatedAt = createdAt;
    if(!name) return res.status(404).json({msg: 'field Name harus disi!'});
    if(!price) return res.status(404).json({msg: 'field price harus disi!'});
    if(!description) return res.status(404).json({msg: 'field description harus disi!'});
    // mengambil file

    const file = req.files.file;
    const filesize = file.data.length;
    // mengambil extension file, harus import path from "path"
    const ext = path.extname(file.name);
    const filename = file.md5 + ext;

    const url = `${req.protocol}://${req.get("host")}/images/${filename}`;

    // const url2 = `${req.protocol}://${req.get("host")}/profileImages/tesimage.jpg`;
    // console.log(url2);
    
    const allowedType = ['.png','.jpg','jpeg'];

    const products = await Product.findAll({
        attributes: ["image"],
    })
    for(let i of products){
        if(i.image === filename) return res.status(400).json({msg:"image sudah terpakai silahkan menggunakan image lain!"});
    }

    const addProduct = {
        name: name,
        price: price,
        description: description,
        image: filename,
        url: url,
    }

    // jika extension(sudah di ubah ke huruf kecil) tidak memiliki ext yang ada di allowedtype maka return msg invalid image
    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: 'invalid images'});
    // jika filesize lebih dari 5mb return pesan
    if(filesize > 5000000) return res.status(422).json({msg: 'image must be less than 5MB'});
    // console.log(`file : ${file}`);

    // buat folder public/iamges untuk menyimpan imageny
    file.mv(`./public/images/${filename}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
            try{
                await Product.create(addProduct);
                return res.status(201).json({msg: 'berhasil add data product'});
            }catch(err){
                return res.status(500).json({status: 'fail',msg: 'gagal add data product!',serverMessage: err.message});
            }
    });
};

const getProductById = async(req,res)=>{
    try{
        const response = await Product.findOne({
            where: {
                id : req.params.id
            }
        });
        if(!response) return res.status(404).json({status: 'fail',msg: 'data tidak ditemukan!'})
        return res.status(200).json({
            status: 'success',
            data: {
                response,
            }
        })
    }catch(err){
        return res.status(500).json({
            status: "fail",
            msg: 'server error',
            serverMsg: err.message,
        })
    }
}

const editProductById = async(req,res)=>{
    const product = await Product.findOne({
        where: {
            id: req.params.id,
        }
    });

    if(!product) return res.status(404).json({msg: `data tidak ditemukan!`});
    let filename = '';

    if(req.files === null){
        filename = product.image;
    }else{
        const file = req.files.file;
        const filesize = file.data.length;
        const ext = path.extname(file.name);
        filename = file.md5 + ext;

        const allowedType = ['.png','.jpg','jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: 'invalid images'});
        if(filesize > 5000000) return res.status(422).json({msg: 'image must be less than 5MB'});

        const products = await Product.findAll({
            attributes: ["image"],
        })
        for(let i of products){
            if(i.image === filename) return res.status(400).json({msg: 'image sudah terpakai, silahkan menggunakan image lain!'});
        }
        
        const filePath = `./public/images/${product.image}`;
        
        fs.unlinkSync(filePath);

        file.mv(`./public/images/${filename}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message})
        })
    }
   
    const { name, price, description } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/${filename}`;

    if(!name) return res.status(404).json({msg: 'field Name harus disi!'});
    if(!price) return res.status(404).json({msg: 'field price harus disi!'});
    if(!description) return res.status(404).json({msg: 'field description harus disi!'});

    try{
        await Product.update({name: name,price: price,description: description,image: filename,url: url},{
            where: {
                id: req.params.id
            }
        })
        return res.status(201).json({status: 'success',msg: 'product berhasil di update!'});
    }catch(err){
        return res.status(500).json({status: 'fail',msg: 'product gagal di update!'});
    }
}

const deleteProductById = async (req,res)=>{
    const response = await Product.findOne({
        where: {
            id: req.params.id,
        }
    })
    if(!response) return res.status(404).json({msg:'data tidak ditemukan!'});
    try{
        // menghapus image pada public/images menggunakan fs dengan nama field image pada tabel product
        const filePath = `./public/images/${response.image}`;
        
        fs.unlinkSync(filePath);
        
        // menghapus product yang product id === id pada req.params
        await Product.destroy({
            where: {
                id: req.params.id,
            }
        });
        return res.status(201).json({status: 'success', msg: 'product berhasil di hapus!'});
    }catch(err){
        return res.status(404).json({status: 'fail', msg: 'product gagal di hapus!',serverMsg: err.message});
    }
}

export { getAllProducts, getProductById, addProduct, editProductById, deleteProductById }