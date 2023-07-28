/* eslint-disable react/prop-types */
import { useState,useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products,setProducts] = useState([]);
    const [user,setUser] = useState([]);

    const [cart,setCart] = useState([]);
    
    let [quantity,setQuantity] = useState(1);

    const addToCart = async(uuid) =>{
        const newCartItem = products
        .filter((product)=>product.uuid === uuid)
        .map((product)=>({
            id: product.id,
            userId: user.id,
            productId: product.uuid,
            name: product.name,
            price: product.price,
            url: product.url,
            quantity: quantity,
        }))[0];
        
        const existingCartItem = cart.find((item) => item.productId === newCartItem.productId && item.userId === newCartItem.userId);

        if (existingCartItem) {
          try{
            console.log(cart);
            for(let item of cart){
                if(item.productId === uuid && item.userId == user.id){
                    await axios.put(`${import.meta.env.VITE_SERVER_URL}/cart/${uuid}/${user.id}`,{
                        id: newCartItem.id,
                        userId: user.id,
                        productId: newCartItem.uuid,
                        name: newCartItem.name,
                        price: newCartItem.price,
                        url: newCartItem.url,
                        quantity: 1,
                    });
                }
            }
            alert("Berhasil add product to Cart");
          }catch(err){
            console.log(err);
            alert(err.response.data.msg);
          }
        } else {
            try{
                await axios.post(`${import.meta.env.VITE_SERVER_URL}/cart`,{
                    userId: newCartItem.userId,
                    productId: newCartItem.productId,
                    name: newCartItem.name,
                    price: newCartItem.price,
                    quantity: newCartItem.quantity,
                    url: newCartItem.url,
                });
                setQuantity(1);
                alert("Berhasil add product to Cart");
            }catch(err){
                console.log(err);
                alert(err.response.data.msg);
            }
        }
    }
    
    useEffect(()=>{
        const getProduct = async()=>{
            const response = await axios(`${import.meta.env.VITE_SERVER_URL}/product`);
            setProducts(response.data.data.response);
        }
        getProduct();
    },[products]);

    // useEffect(()=>{
    //     console.log(cart);
    // },[cart]);

    useEffect(()=>{
        const getUser = async()=>{
            const response = (await axios(`${import.meta.env.VITE_SERVER_URL}/me`)).data;
            setUser(response);
        }
        getUser();
    },[user]);

    useEffect(()=>{
        const getCart = async()=>{
            const response = (await axios(`${import.meta.env.VITE_SERVER_URL}/cart`)).data.dataCart;
            setCart(response);
        }
        getCart();
    },[cart]);

  return (
    <>
    <section>
        <div className="container p-5">
            <div className="row justify-content-center align-items-center">
                {products.length > 0 ? (
                    products.map((product)=>{
                        return(
                            <div className="col-md-12 col-lg-4 col-sm-8  mb-4 mb-lg-0" key={product.id}>
                                <div className="card p-5" style={{maxWidth: '300px'}}>
                                <Link to={`/product/${product.id}`} className="" style={{textDecoration: "none"}}>
                                    <div className="text-center">
                                        <img src={product.url} className="card-img-top"  alt="" />
                                    </div>

                                    <div className="card-body text-dark">
                                        <div className="d-flex justify-content-between mb-3">
                                            <h5 className="mb-0">{product.name}</h5>
                                        </div>
                                        <h5 className="mb-2">Rp. {product.price.toLocaleString()}</h5>
                                    </div>
                                </Link>
                                    <div className="d-flex justify-content-between mb-2">
                                        <button className="btn btn-light" onClick={addToCart.bind(this,product.uuid)}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) 
                 : "Product Masih Kosong"}
            </div>
        </div>
    </section>
    </>
  )
}

export default ProductList