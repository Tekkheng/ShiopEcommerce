import LayoutHome from "./home/layout"
import LayoutAdmin from "./admin/layout"
import EditProfile from "../component/editProfile"
import { useState,useEffect } from "react"
import axios from "axios"

const Profile = () => {
  const [me,setMe] = useState([]);
  useEffect(()=>{
    try{
      const getMe = async () =>{
        const response = (await axios(`${import.meta.env.VITE_SERVER_URL}/me`)).data;
        setMe(response);
      }
      getMe();
    }catch(err){
      console.log(err);
    }
  },[me]);
  
  return (
    <>
    {me.role === "users" ? (
      <LayoutHome>
          <EditProfile/>
      </LayoutHome>
    ) : 
    (
      <LayoutAdmin>
          <EditProfile/>
      </LayoutAdmin>
    )}
    </>

    
  )
}

export default Profile