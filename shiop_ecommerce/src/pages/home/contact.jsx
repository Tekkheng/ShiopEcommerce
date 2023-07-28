import Form from "../../component/home/form"
import Layout from "./layout"
const Contact = () => {
  return (
    <>
        <Layout>
            <section className="mt-5 mb-5" id="contact">
                <h2 className="text-center">Form Me</h2>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6" data-aos="zoom-in">
                            <Form/>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    </>
  )
}

export default Contact