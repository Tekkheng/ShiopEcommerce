import Users from "../models/users.js";

const VerifyUser = async(req,res,next) =>{
    if(!req.session.userId) return res.status(401).json({msg: 'Silahkan Login ke akun anda terlebih dahulu!'});
    const user = await Users.findOne({
        attributes: ['uuid','name','email','role'],
        where: {
            uuid: req.session.userId,
        },
    });
    if(!user) return res.status(404).json({msg:'user tidak ditemukan!'});
    req.userId = user.id;
    req.role = user.role;
    next();
}

const AdminOnly = async(req,res,next) =>{
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId,
        },
    });
    if(!user) return res.status(404).json({msg:'user tidak ditemukan!'});
    if(user.role !== 'admin') return res.status(404).json({msg:'akses tidak di izinkan!'});
    next();
}
export { VerifyUser,AdminOnly }