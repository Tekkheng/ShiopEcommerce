import { IoArrowBack } from "react-icons/io5";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react"; 
import axios from "axios";

const ProductDetail = () => {
    const [product,setProduct] = useState([]);
    const [user,setUser] = useState([]);

    const [cart,setCart] = useState([]);

    let [quantity,setQuantity] = useState(1);

    const productId = product.uuid;
    const name = product.name;
    const price = product.price;
    const url = product.url;
    const userId = user.id;

    const addToCart = async(uuid) =>{
        const existingCartItem = cart.find((item) => item.productId === productId && item.userId === userId);
        if(existingCartItem){
            try{
                for(let item of cart){
                    if(item.productId === uuid && item.userId == userId){
                        await axios.put(`${import.meta.env.VITE_SERVER_URL}/cart/${uuid}/${userId}`,{
                            ...item,
                            quantity: quantity,
                        });
                    }
                }
                alert("berhasil add product!");
            }catch(err){
                console.log(err);
                alert(err.response.data.msg);
            }
        }else{
            try{
                await axios.post(`${import.meta.env.VITE_SERVER_URL}/cart`,{
                    userId: userId,
                    productId: productId,
                    name: name,
                    price: price,
                    url: url,
                    quantity: quantity,
                });
                alert("berhasil add product!");
            }catch(err){
                console.log(err);
                alert(err.response.data.msg);
            }
        }
        setQuantity(1);
    }

    const increment = () =>{
        setQuantity(quantity += 1)
    }
    const decrement = () =>{
        if(quantity > 1){
            setQuantity(quantity -= 1)
        }
    }

    const { id } = useParams();
    useEffect(()=>{
        const getProductById = async() =>{
            const response = (await axios(`${import.meta.env.VITE_SERVER_URL}/product/${id}`)).data.data.response;
            setProduct(response);
        }
        getProductById();
    },[id,product]);

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
        <div className="container mt-5">
            <div className="card mb-3 mx-auto p-5" style={{maxWidth: '540px'}} key={product.id}>
                <div className="row g-0">
                    <div className="col-lg-12 col-md-12 col-sm-12 mb-5">
                        <Link className="arrowBack" to="/product"><IoArrowBack/> Back To Product</Link>
                    </div>
                    <hr style={{borderTop: '1px solid #8c8b8b'}}/>
                    <div className="col-md-4 col-lg-4 col-sm-12 text-center pe-3">
                        <img src={product.url} className="rounded pb-3" alt="..." />
                    </div>
                    <div className="col-md-8 col-lg-8 col-sm-12">
                        <div className="card-body" style={{minWidth: '250px'}}>
                            <div className="d-flex justify-content-between mb-3">
                                <h2 className="card-title">{product.name}</h2>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <h2 className="card-title">Rp. {product.price}</h2>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <h2 className="card-title">Description :</h2>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <p className="card-text">{product.description}</p>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <div className="input-group mb-3" style={{width:"150px"}}>
                                    <button className="input-group-text btn btn-light" onClick={decrement}>-</button>
                                    <input type="number" className="form-control text-center" aria-label="Amount (to the nearest dollar)" value={quantity} onChange={(inpt)=>setQuantity(inpt)}/>
                                    <button className="input-group-text btn btn-light" onClick={increment}>+</button>
                                </div>
                            </div>
                            <button className="btn btn-success" type="submit" onClick={addToCart.bind(this, product.uuid)}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProductDetail