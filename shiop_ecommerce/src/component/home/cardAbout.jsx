import img from '../../assets/profile.png'
const CardAbout = () => {
  return (
    <>
        <div
            className="col-lg-3 col-md-4 col-sm-6 mt-3"
            data-aos="zoom-out-right"
            data-aos-duration="1200"
            >
            <div className="card text-center">
                <img src={img} className="card-img-top" alt="..." />
                <div className="card-body">
                <h5 className="card-title">FullName</h5>
                <p className="card-text">DESIGNATION</p>
                <a target="_blank" className="btn btn-primary">
                    See More
                </a>
                </div>
            </div>
        </div>
    </>
  )
}

export default CardAbout