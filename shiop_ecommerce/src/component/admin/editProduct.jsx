import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"
const Product = () => {
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [desc,setDesc] = useState("");
    const [file,setFile] = useState("");
    const [preview,setPreview] = useState("");

    const [error,setError] = useState(null);

    // const [getProduct,setGetProduct] = useState([]);
    
    const {id} = useParams();
    const navigate = useNavigate();

    // useEffect(()=>{
    //     setName(getProduct.name);

    // },[])

    const loadImage = (e) =>{
      e.preventDefault();
      const getFile = e.target.files[0];
      setPreview(URL.createObjectURL(getFile));
      setFile(getFile)
    }
    const editProduct = async(e) =>{
      e.preventDefault();
      try{
        await axios.put(`${import.meta.env.VITE_SERVER_URL}/product/${id}`,{
          name: name,
          price: price,
          description: desc,
          file: file,
        },{
          headers: {
          "Content-type": "multipart/form-data",
          },
        });

        // await axios.put(`http://localhost:5000/cart/${id}`,{
        //     url: pro
        // },{
        // headers: {
        // "Content-type": "multipart/form-data",
        // },
        // });

        setName("");
        setPrice("");
        setDesc("");
        setFile("");
        setPreview("");
        setError(null);
        alert("Success Edit Product");
        navigate('/getProduct');
      }catch(err){
        console.log(err);
        setError(err.response.data.msg);
      }
    }

    // useEffect(()=>{
    //     const getproductById = async() =>{
    //         const response = (await axios(`http://localhost:5000/product/${id}`)).data.data.response;
    //         setGetProduct(response);
    //         setName(getProduct.name);
    //     } 
    //     getproductById();
    // },[getProduct,id,name]);
  return (
    <>
        <div className="container">
            <div className="row justify-content-around">
                <div className="col-lg-7 col-md-8 col-sm-10">
                    <form onSubmit={editProduct}>
                        {error !== null && <h1 className="mt-5 mb-4">{error}</h1>}
                        <div className="field">
                            <label className="label">Product Name</label>
                            <div className="control">
                                <input className="input" type="text" name="name" placeholder="product name..." onChange={(inpt)=>setName(inpt.target.value)} value={name}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Price</label>
                            <div className="control">
                                <input className="input" type="number" name="price" placeholder="price..." onChange={(inpt)=>setPrice(inpt.target.value)} value={price}/>
                            </div>
                        </div>

                        <div className="file mb-5">
                        <label className="file-label">
                            <label className="label pe-2">Image : </label>
                            <div className="control">
                                <input className="file-input" type="file" name="resume" onChange={loadImage}/>
                                <span className="file-cta">
                                <span className="file-icon">
                                    <i className="fas fa-upload"></i>
                                </span>
                                <span className="file-label">
                                    Choose a file…
                                </span>
                                </span>
                            </div>
                        </label>
                        </div>
                        { preview ? (
                            <figure className="image is-128x128" style={{marginBottom:"10%"}}>
                                <img src={preview} alt="preview image"/>
                            </figure>
                        ) : ""}

                        <div className="field">
                            <label className="label">Description</label>
                            <div className="control">
                                <textarea className="textarea" name="description" onChange={(inpt)=>setDesc(inpt.target.value)} value={desc}placeholder="Textarea"></textarea>
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link" type="submit">Submit</button>
                            </div>
                            <Link to="/getProduct">
                                <button className="button is-link is-light">Cancel</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Product