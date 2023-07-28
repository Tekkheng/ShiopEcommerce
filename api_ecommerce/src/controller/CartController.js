import Cart from "../models/cart.js";

const getAllCart = async(req,res) =>{
    const dataCart = await Cart.findAll();
    try{
        return res.status(200).json({status: 'success', dataCart});
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

const addCart = async(req,res) =>{
    const getCart = await Cart.findAll({
        attributes: ["productId","userId"],
    });
    const { name, userId, productId, price, url, quantity } = req.body;
    // for(let item of getCart){
    //     if(item.productId === productId && item.userId === userId) return res.status(400).json({msg: 'product ini sudah ditambahkan!'});
    // }
    for(let item of getCart){
        if(item.productId === productId){
            if(item.userId == userId){
                return res.status(400).json({msg: 'product ini sudah ditambahkan!'});
            }
        } 
    }
    try{
        await Cart.create({
            userId: userId,
            productId: productId,
            name: name,
            price: price,
            url: url,
            quantity: quantity,
        });
        return res.status(201).json({status: 'success',msg:'berhasil add cart'});
    }catch(err){
        return res.status(500).json({msg: err});
    }
}

const updateCart = async(req,res) =>{
    const { productId, userId } = req.params;

    const getCart = await Cart.findOne({
        where: {
            productId,
            userId,
        },
    });

    if (!getCart) {
        return res.status(404).json({ message: 'Cart not found' });
    }
    const { quantity } = req.body;
    let { min } = req.body;
    try{
        if(min){
            if(getCart.quantity > 0){
                await Cart.update({
                    userId: getCart.userId,
                    productId: getCart.productId,
                    name: getCart.name,
                    price: getCart.price,
                    url: getCart.url,
                    quantity: getCart.quantity - quantity,
                },{
                    where: {
                        productId,
                        userId,
                    },
                });
                return res.status(201).json({status: 'success',msg:'berhasil update cart'});
            }else{
                return res.status(400).json({msg: "quantity sudah 0, quantity tidak bisa mines!"});
            }
        }else{
            await Cart.update({
                userId: getCart.userId,
                productId: getCart.productId,
                name: getCart.name,
                price: getCart.price,
                url: getCart.url,
                quantity: getCart.quantity + quantity,
            },{
                where: {
                    productId,
                    userId,
                },
            });
            return res.status(201).json({status: 'success',msg:'berhasil update cart'});
        }
    }catch(err){
        return res.status(500).json({msg: err});
    }
}

const getCartById = async(req,res) =>{
    const { userId } = req.params;
    const dataCart = await Cart.findAll({
        where:{
            userId,
        },
    });
    if (!dataCart) {
        return res.status(404).json({ message: 'Cart not found' });
    }
    try{
        return res.status(200).json({status: 'success', dataCart});
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
}

const deleteCartById = async(req,res) =>{
    const { productId, userId } = req.params;

    const getCart = await Cart.findOne({
        where: {
            productId,
            userId,
        },
    });

    if (!getCart) {
        return res.status(404).json({ message: 'Cart not found' });
    }

    try{
        await Cart.destroy({
            where: {
                productId,
                userId,
            },
        })
        return res.status(201).json({status: 'success',msg:'berhasil hapus cart'});
    }catch(err){
        return res.status(500).json({msg: err});
    }
}

export {getAllCart,addCart,updateCart, getCartById, deleteCartById};