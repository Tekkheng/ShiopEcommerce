import ProductList from "../../component/home/productList"
import Navbar from "../../component/home/navbar"
import Footer from "../../component/home/footer"

const Home = () => {
  return (
    <>
        <Navbar/>
        <section className="myProject mt-5 mb-5" id="project">
          <h2 className="text-center">My Product</h2>
          <div className="container">
            <div className="row d-flex justify-content-center">
              <ProductList/>
            </div>
          </div>
        </section>
        <Footer/>
    </>
  )
}

export default Home