/* eslint-disable no-unused-vars */
import Layout from "./layout"
import Welcome from "./welcome"

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

// import { getMe } from "../features/authSlice";
// import Layout from "./Layout";
// import Welcome from "../components/Welcome";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/my_ecommerce");
    }
  }, [isError, navigate]);
  
  return (
    <>  
        <Layout>
            <Welcome/>
        </Layout>
    </>
  )
}

export default Dashboard