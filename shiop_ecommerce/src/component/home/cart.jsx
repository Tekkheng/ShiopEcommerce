import { useState, useEffect } from "react"
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { IoTrashBin, IoCartOutline } from "react-icons/io5";
import { nanoid } from 'nanoid';

import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../features/authSlice";

const Cart = () => {
    const [cart,setCart] = useState([]);
    const [setQuantity] = useState(0);
    let [totalHarga,setTotalHarga] = useState("");
    
    const { userId } = useParams();

    const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const order_id = nanoid(7);
    const [order,setOrder] = useState(nanoid(7));
    const [token,setToken] = useState("");
    // console.log(typeof(totalHarga));

    const [tesItem, setTesItem] = useState([]);

    useEffect(()=>{
        console.log(tesItem);
    },[tesItem]);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);
    const { user } = useSelector((state) => state.auth);

    const process_payment = async()=>{
        const data = {
            name: user.name,
            order_id: order,
            total: totalHarga
        }
        const config = {
            headers:{
                "Content-Type": "application/json",
            }
        }
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/payment/process-transaction`,data,config);
        console.log(response);
        setToken(response.data.token);
    };

    useEffect(()=>{
        if(token){
            window.snap.pay(token, {
                onSuccess: (result) => {
                    localStorage.setItem("Pembayaran",JSON.stringify(result))
                    setTesItem(result);
                    console.log(result);
                    setToken("");
                },
                onPending: (result) => {
                    localStorage.setItem("Pembayaran", JSON.stringify(result))
                    setToken("");
                },
                onError: (error) => {
                    console.log(error);
                    setToken("");
                },
                onClose: () => {
                    console.log("Anda belum menyelesaikan pembayaran");
                    setToken("");
                }
            })
            setOrder("");
            setTotalHarga("");
        }
    },[token]);

    useEffect(()=>{
        const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        let scriptTag = document.createElement("script")
        scriptTag.src = midtransUrl
        const midtransClientKey = "SB-Mid-client-M1eAkf_rSu80N6tI"
        
        // const midtransUrl = `https://app.midtrans.com/snap/snap.js`;
        // let scriptTag = document.createElement("script")
        // scriptTag.src = midtransUrl
        // const midtransClientKey = "Mid-client-pzidNh0gxAX_1urG"

        scriptTag.setAttribute("data-client-key", midtransClientKey)
        document.body.appendChild(scriptTag)
        return() =>{
            document.body.removeChild(scriptTag)
        }
    },[])

    const increment = async(productId) =>{
        try{
            console.log(cart);
            for(let item of cart){
                if(item.productId === productId && item.userId == userId){
                    await axios.put(`${import.meta.env.VITE_SERVER_URL}/cart/${productId}/${userId}`,{
                        id: item.id,
                        userId: item.id,
                        productId: item.uuid,
                        name: item.name,
                        price: item.price,
                        url: item.url,
                        quantity: 1,
                    });
                }
            }
        }catch(err){
            console.log(err);
        }
    }
    const decrement = async(productId) =>{
        try{
            console.log(cart);
            for(let item of cart){
                if(item.productId === productId && item.userId == userId){
                    await axios.put(`${import.meta.env.VITE_SERVER_URL}/cart/${productId}/${userId}`,{
                        id: item.id,
                        userId: item.id,
                        productId: item.uuid,
                        name: item.name,
                        price: item.price,
                        url: item.url,
                        quantity: 1,
                        min: true,
                    });
                }
            }
        }catch(err){
            console.log(err.response.data.msg);
        }
    }

    const deleteCart = async(productId) =>{
        try{
            console.log(cart);
            for(let item of cart){
                if(item.productId === productId && item.userId == userId){
                    await axios.delete(`${import.meta.env.VITE_SERVER_URL}/cart/${productId}/${userId}`);
                }
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        const getCart = async()=>{
            const response = (await axios(`${import.meta.env.VITE_SERVER_URL}/cart/${userId}`)).data.dataCart;
            setCart(response);

            const hitungTotal = () => {
                let total_h = 0;
                for(let i of cart){
                    const itemTotal = i.price * i.quantity;
                    total_h += itemTotal;
                }
                setTotalHarga(total_h);
            };
            hitungTotal();
        }
        getCart();
    },[cart,userId,totalHarga]);

    useEffect(()=>{
        // setTotal(10);
    },[totalHarga]);
    
    return (
        <>  
            {cart.length > 0 ? (
                <div className="container mt-5 p-5" style={{maxHeight:"300vh"}}>
                    <div className="card mb-3 mx-auto p-5 bg bg-body-tertiary" style={{maxWidth: '540px'}}>
                        <div className="row g-0">
                            <div className="col-lg-12 col-md-12 col-sm-12 mb-5">
                                <h1 className="text-center fw-bold fs-5" to="/product">Cart Items {cart.length}</h1>
                            </div>
                            <hr style={{borderTop: '1px solid #8c8b8b'}}/>
                            {cart.map((c)=>{
                                return (
                                    <div key={c.id} className="d-flex p-3">
                                        <div className="bg bg-white p-3 d-flex">
                                            <div className="col-md-4 col-lg-4 col-sm-12 text-center pe-3">
                                                <img src={c.url} className="rounded" alt="..." />
                                            </div>
                                            <div className="col-md-8 col-lg-8 col-sm-12">
                                                <div className="card-body" style={{minWidth: '250px'}}>
                                                    <div className="d-flex justify-content-between mb-3">
                                                        <h2 className="card-title">{c.name}</h2>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-3">
                                                        <h2 className="card-title">Rp. {c.price.toLocaleString()}</h2>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-3">
                                                        <h2 className="card-title">Quantity : {c.quantity}</h2>
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-3">
                                                        <div className="input-group" style={{width:"200px"}}>
                                                            <button className="input-group-text btn btn-light" onClick={decrement.bind(this, c.productId)}>-</button>
                                                            <input type="number" className="form-control text-center" aria-label="Amount (to the nearest dollar)" value={c.quantity} onChange={(value)=>setQuantity(value)}/>
                                                            <button className="input-group-text btn btn-light" onClick={increment.bind(this, c.productId)}>+</button>
                                                            <button className="input-group-text btn btn-light ms-2" onClick={deleteCart.bind(this, c.productId)}><IoTrashBin/></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <h1>Total Pembayaran: {totalHarga.toLocaleString()} </h1>
                            <button className="btn btn-success mt-5" type="submit" onClick={process_payment}>Buy Now</button>
                        </div>
                    </div>
                </div>
            ):
            (
                <div className="" style={{minHeight:"80vh"}}>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h1 className="m-5 p-5" style={{fontSize: "8rem"}}><IoCartOutline/></h1>
                            <h1 className="text-center fs-4 mb-3">Your Cart Is Empty!</h1>
                        </div>
                        <Link className="nav-link" to="/product">
                            <button className="btn btn-warning text-light">Shopping</button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default Cart