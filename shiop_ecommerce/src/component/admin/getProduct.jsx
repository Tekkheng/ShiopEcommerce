import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

const Product = () => {
    const [products,setProducts] = useState([]);
    let [nomor] = useState(0);
    const navigate = useNavigate();
    const getProduct = async()=>{
        const response = await axios(`${import.meta.env.VITE_SERVER_URL}/product`);
        const result = response.data.data.response;
        setProducts(result);
    }
    useEffect(()=>{
        getProduct();
    },[products]);

    const deleteProductById = async(id) =>{
        try{
            await axios.delete(`${import.meta.env.VITE_SERVER_URL}/product/${id}`);
            navigate('/getProduct');
        }catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <h1 className="mb-2 fs-4 fw-bold">Product</h1>
            <Link to="/addProduct" className>Add New Product</Link>
            <table className="table mt-5">
                <thead>
                    <tr>
                    <th><abbr title="No">No</abbr></th>
                    <th>Name</th>
                    <th><abbr title="Played">Image</abbr></th>
                    <th><abbr title="Won">Price</abbr></th>
                    <th><abbr title="Drawn">Description</abbr></th>
                    <th><abbr title="Goals for">CreatedAt</abbr></th>
                    <th><abbr title="Goals against">UpadatedAt</abbr></th>
                    <th><abbr title="Goals against" className="ms-5">Action</abbr></th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product)=>{
                            return (
                                <tr key={product.id}>
                                    <th>{nomor +=1 }</th>
                                    <td>{product.name}</td>
                                    <td><img src={product.url} style={{width:"40px"}}/></td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                    <td>{product.createdAt}</td>
                                    <td>{product.updatedAt}</td>
                                    <td>
                                        <Link to={`/editProduct/${product.id}`} className="">
                                            <button className="btn btn-primary m-2">Edit</button>
                                        </Link>
                                        <Link to={`/deleteProduct/${product.id}`} className="">
                                            <button className="btn btn-danger" onClick={deleteProductById.bind(this,product.id)}>Delete</button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    ) : "Product masih kosong!"}
                </tbody>
            </table>
        </>
    )
}

export default Product