import Contact from "../models/contact.js";

const getAllContact = async (req,res)=>{
    try{
        const response = await Contact.findAll();
        return res.status(200).json({status: 'succes', data: {response}});
    }catch(err){
        return res.status(500).json({status: 'fail', Servermsg: err.message});
    }
}

const getContactById = async (req,res)=>{
    try{
        const response = await Contact.findOne({
            where: {
                id: req.params.id,
            }
        });
        if(!response) return res.status(404).json({status: 'fail', msg: 'data tidak ditemukan!'});

        return res.status(200).json({status: 'succes', data: {response}});
    }catch(err){
        return res.status(404).json({status: 'fail', msg: 'id tidak ditemukan', Servermsg: err.message});
    }
}

const addContact = async (req,res)=>{
    const { name,no_hp, email, message } = req.body
    if(!name) return res.status(404).json({msg: 'field name harus di isi!'});
    if(!no_hp) return res.status(404).json({msg: 'field no_hp harus di isi!'});
    if(!email) return res.status(404).json({msg: 'field email harus di isi!'});
    if(!message) return res.status(404).json({msg: 'field message harus di isi!'});
    try{
        await Contact.create({
            name: name,
            no_hp: no_hp,
            email: email,
            message: message,
        })
        return res.status(201).json({status: 'success', msg: 'berhasil add data contact'});
    }catch(err){
        return res.status(400).json({msg: err.message});
    }
}

// const editContactById = async (req,res)=>{
//     const response = await Contact.findOne({
//         where: {
//             id: req.params.id,
//         }
//     });
//     if(!response) return res.status(404).json({status: 'fail', msg: 'data tidak ditemukan!'});

//     const { name,no_hp, email, message } = req.body
//     // if(!name) return res.status(404).json({msg: 'field name harus di isi!'});
//     // if(!no_hp) return res.status(404).json({msg: 'field no_hp harus di isi!'});
//     // if(!email) return res.status(404).json({msg: 'field email harus di isi!'});
//     // if(!message) return res.status(404).json({msg: 'field message harus di isi!'});
//     try{
//         await Contact.update({
//             name: name,
//             no_hp: no_hp,
//             email: email,
//             message: message,
//         },{
//             where: {
//                 id: req.params.id,
//             }
//         });
//         return res.status(401).json({status: 'success', msg: 'berhasil edit data contact'});
//     }catch(err){
//         return res.status(400).json({msg: err.message});
//     }
// }

const deleteContactById = async (req,res)=>{
    const response = await Contact.findOne({
        where: {
            id: req.params.id,
        }
    });
    if(!response) return res.status(404).json({status: 'fail', msg: 'data tidak ditemukan!'});
    try{
        await Contact.destroy({
            where: {
                id: req.params.id,
            }
        });
        return res.status(201).json({status: 'success', msg: 'berhasil hapus data contact'});
    }catch(err){
        return res.status(400).json({msg: err.message});
    }
}

export { getAllContact, addContact, getContactById, deleteContactById }