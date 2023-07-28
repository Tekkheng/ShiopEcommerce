import axios from 'axios'
import { useState } from 'react'

const Form = () => {
  const [name,setName] = useState("");
  const [hp,setHP] = useState("");
  const [email,setEmail] = useState("");
  const [msg,setMsg] = useState("");
  const [error,setError] = useState(null);

  // const fieldHandler = (e) =>{
  //   const name = e.target.getAttribute('name');
  //   const value = e.target.value;
  //   setForm({
  //     ...form,
  //     [name]: value,
  //   });    
  // }
  const SubmitForm = async(e) =>{
    e.preventDefault();
    try{
      const newContact = {
        name: name,
        no_hp: `+62${hp}`,
        email: email,
        message: msg,
      }
      console.log(newContact);
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/contact`, newContact);
      setName("");
      setHP("");
      setEmail("");
      setMsg("");

      setError(null);
      alert("success send message");
    }catch(err){
      console.log(err);
      setError({body:"border border-danger",pesan: err.response.data.msg});
    }
  }
  
  return (
    <>
      <form onSubmit={SubmitForm}>
          <div className="row mt-5">
            <p className='mb-4 text-center'>{error !== null && error.pesan}</p>
            <div className= "col-md-6 mb-4">
              <label htmlFor="exampleInputUsername" className="form-label">
                Username
              </label>
              <input name="name" onChange={(inpt)=>setName(inpt.target.value)}
                type="text"
                className="form-control"
                id="exampleInputUsername"
                placeholder="Name..." value={name}
              />
            </div>
            <div className= "col-md-6 mb-4">
              <label htmlFor="exampleInputNoHP" className="form-label">
                No HP
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">+62</span>
                <input name="no_hp" onChange={(inpt)=>setHP(inpt.target.value)}
                  type="number"
                  className="form-control"
                  id="exampleInputNoHP"
                  placeholder="Nomor HP..." value={hp} aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className= "col-md-12 mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input name="email" onChange={(inpt)=>setEmail(inpt.target.value)}
                type="email"
                className={`form-control ${error}`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="email@..." value={email}
              />
            </div>
            <div className= "col-md-12 mb-4">
              <label htmlFor="floatingTextarea2" className="form-label">Message</label>
                <textarea name="message" onChange={(inpt)=>setMsg(inpt.target.value)}
                  className="form-control"
                  placeholder="Message"
                  id="floatingTextarea2"
                  style={{ height: "100px" }} value={msg}
                ></textarea>
            </div>
           </div>
            <button type="submit" className="btn btn-primary btn-block" style={{width:"100%"}}>
              Submit
            </button>
      </form>

      {/* <form onSubmit={SubmitForm}>
          <div className="row mt-5">
            <div className= "col-md-6">
              <label htmlFor="exampleInputUsername" className="form-label">
                Username
              </label>
              <input name="name" onChange={fieldHandler.bind(this)}
                type="password"
                className="form-control"
                id="exampleInputUsername"
                placeholder="Name..."
              />
            </div>
            <div className= "col-md-6 mb-4">
              <label htmlFor="exampleInputNoHP" className="form-label">
                No HP
              </label>
              <input name="no_hp" onChange={fieldHandler.bind(this)}
                type="number"
                className="form-control"
                id="exampleInputNoHP"
                placeholder="Nomor HP..."
              />
            </div>
            <div className= "col-md-12 mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input name="email" onChange={fieldHandler.bind(this)}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="email@..."
              />
            </div>
            <div className= "col-md-12 mb-4">
              <label htmlFor="floatingTextarea2" className="form-label">Message</label>
                <textarea name="message" onChange={fieldHandler.bind(this)}
                  className="form-control"
                  placeholder="Message"
                  id="floatingTextarea2"
                  style={{ height: "100px" }}
                ></textarea>
            </div>
           </div>
              <button type="submit" className="btn btn-primary btn-block" style={{width:"100%"}}>
                Submit
              </button>
      </form> */}
      
    </>
  )
}

export default Form