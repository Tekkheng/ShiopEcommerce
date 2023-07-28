import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

const EditProfile = () => {
  const [preview,setPreview] = useState("");
  const [file, setFile] = useState("");
  const [getUser,setGetUser] = useState([]);

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [error,setError] = useState(null);

  const {uuid} = useParams();

  const LoadImage = (e) =>{
    e.preventDefault();
    const image = e.target.files[0];
    setFile(image);
    console.log(file);
    setPreview(URL.createObjectURL(image));
  }

  const ClearImage = (e) => {
    e.preventDefault();
    setFile("");
    setPreview("");
  }
  
  useEffect(()=>{
    try{
      const User = async() =>{
          const response = (await axios(`${import.meta.env.VITE_SERVER_URL}/me`)).data;
          setGetUser(response);
      }
      User();
    }catch(err){
      console.log(err);
    }
  },[getUser])
  
  const SubmitEditProfile = async(e) =>{
    e.preventDefault();
    try{
      const newProfile = {
        name: name,
        email: email,
        image: file,
      }
      // console.log(newProfile);
      await axios.put(`${import.meta.env.VITE_SERVER_URL}/usersProfile/${uuid}`,newProfile,{
        headers: {
        "Content-type": "multipart/form-data",
        },
      });
      setName("");
      setEmail("");
      setPreview("");
      setFile("");
      setError(null);
    }catch(err){
      console.log(err.response);
      setError(err.response.data.msg);
    }
  }

  return (
    <>
      <form onSubmit={SubmitEditProfile}>
        <div className="container d-flex justify-content-center mt-5 flex-column align-items-center">
          <h1 className="mb-4 fs-5 fw-bold">{getUser.name} Profile</h1>
          <div className="text-center mb-4">
            <img className="img-thumbnail rounded" src={getUser.url} width= "150px"/>
            <h1>{getUser.email}</h1>
          </div>
          <h6 className="mt-4 text-danger">{error}</h6>
          <div className="d-flex justify-content-around p-5 flex-column" style={{width:"25rem"}}>
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">Username</label>
              <input type="text" id="inputName" className="form-control" placeholder="edit username..." onChange={(inpt)=>setName(inpt.target.value)} value={name}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={(inpt)=>setEmail(inpt.target.value)} value={email}/>
            </div>
            
            {/* <div className="mb-3">
              <label htmlFor="inputPassword5" className="form-label">Password</label>
              <input type="password" id="inputPassword5" className="form-control" aria-labelledby="passwordHelpBlock"/>
              <div id="passwordHelpBlock" className="form-text">
                Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="inputPassword5" className="form-label">Confirm Password</label>
              <input type="password" id="inputPassword5" className="form-control" aria-labelledby="passwordHelpBlock"/>
            </div> */}

            <div className="file mb-5">
              <label className="file-label">
                  <label className="label pe-2">Image : </label>
                  <div className="control">
                      <input className="file-input" type="file" name="resume" onChange={LoadImage}/>
                      <span className="file-cta">
                          <span className="file-icon">
                              <i className="fas fa-upload"></i>
                          </span>
                          <span className="file-label">
                              {file ? file.name : "Choose a file…"}
                          </span>
                      </span>
                      {preview ? (
                        <figure className="image is-128x128" style={{marginBottom:"10%"}}>
                          <div className="d-flex align-items-end">
                              <img src={preview} alt="preview image"/>
                          </div>
                        </figure>
                      ) : ""}
                  </div>
                      <button className="btn btn-light" onClick={ClearImage}>cancel</button>
              </label>
              </div>
            <button type="submit" className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default EditProfile