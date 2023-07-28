// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom"

const Banner = () => {
  return (
    <section className="intro text-light mb-5">
        <div className="container-fluid">
          <img src="" className="bio" />
          <div className="" style={{lineHeight:"20px"}}>
            <h1 className="mt-3 fw-bold fs-5 mb-5">GET START<br/>YOUR FAVORIT SHOPING</h1>
              <Link className="nav-link text-decoration-none text-dark" to="/product">
                <button className="btn btn-warning p-2 fs-6">
                    Shopping
                </button>
              </Link>
          </div>
        </div>
    </section>
    // <Carousel>
    //     <div>
    //         <img src="https://www.dbmanagers.com/wp-content/uploads/2020/08/ecommerce-graphic-design3.jpg" />
    //         <p className="legend">Legend 1</p>
    //     </div>
    //     <div>
    //         <img src="https://www.dbmanagers.com/wp-content/uploads/2020/08/ecommerce-graphic-design-1-768x512.jpg" />
    //         <p className="legend">Legend 2</p>
    //     </div>
    //     <div>
    //         <img src="assets/3.jpeg" />
    //         <p className="legend">Legend 3</p>
    //     </div>
    // </Carousel>
  )
}

export default Banner