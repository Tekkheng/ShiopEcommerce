/* eslint-disable react/prop-types */
import React from 'react'
import NavbarAdmin from '../../component/admin/navbar'
import Sidebar from '../../component/admin/sidebar'
import axios from 'axios'
axios.defaults.withCredentials = true;
const Layout = ({children}) => {
  return (
    <React.Fragment>
        <NavbarAdmin/>
        <div className='columns mt-3' style={{minHeight:"100vh"}}>
            <div className='column is-2'>
                <Sidebar/>
            </div>
            <div className='column has-background-light'>
                <main>{children}</main>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Layout