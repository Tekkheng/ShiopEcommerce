/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const Mybutton = (props) => {
    console.log(props.click);
  return (
    <Link to={`/product/${props.id}`}>
        <button className={props.class}>Buy It</button>
        {/* <button className={props.class} onClick={btnDetail.bind(this, props.id)}>Buy It</button> */}
    </Link>
  )
}

export default Mybutton