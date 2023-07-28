/* eslint-disable react/prop-types */
import React from 'react'
import Navbar from '../../component/home/navbar'
import Footer from '../../component/home/footer'

const Layout = ({children}) => {
  return (
    <React.Fragment>
        <Navbar/>
          <main>{children}</main>
        <Footer/>
    </React.Fragment>
  )
}

export default Layout