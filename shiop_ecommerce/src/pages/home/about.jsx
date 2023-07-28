import img from '../../assets/blazer.png'
import Layout from './layout'
// import CardAbout from "../../component/home/cardAbout"
// import img from '../../assets/profile.png'

const About = () => {
  return (
    <>
    <Layout>
        <section className="container mb-5" style={{marginTop: "5%"}} id="gallery">
            <div className="justify-content-center d-flex">
                <div className="me-auto pt-5" style={{width:"40%"}}>
                    <h3>Blazer Man</h3>
                    <p className="text-wrap">A website that allows selling men`s clothing products, one of which is a suit via the internet. Through the Trendystore.net website, you can process orders, accept payments, manage shipping and logistics, and provide customer service.<br/><br/>
                    Trendystore.net E-commerce service provides a wide selection of suit products through the Marketplace.
                    Trendystore.net works with logistics partners who are equipped with same-day delivery services with an integrated system.</p>
                </div>
                <div className="me-auto">
                    <img className="bg bg-info" src={img} style={{width: "400px"}}/>
                </div>
            </div>
        </section>
    </Layout>
    </>
  )
}

export default About