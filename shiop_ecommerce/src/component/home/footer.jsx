import { FaLinkedinIn, FaInstagram, FaFacebook, FaTwitter, FaGoogle, FaGithub } from "react-icons/fa";
import SocialMedia from "./socialMedia";
const Footer = () => {
    return (
      // <div className="container-fluid text-center bg bg-dark text-light p-3">
      //   <p>@ 2023 ASHIOP</p>
      // </div>
    <div className="">
      <footer className="text-center text-white" style={{backgroundColor: "#f1f1f1"}}>
      <div className="container pt-4">
        <section className="mb-4">
          <SocialMedia Logo={FaFacebook} Target="https://facebook.com"/>
          <SocialMedia Logo={FaTwitter} Target="https://twitter.com"/>
          <SocialMedia Logo={FaGoogle} Target="https://google.com"/>
          <SocialMedia Logo={FaInstagram} Target="https://instagram.com"/>
          <SocialMedia Logo={FaLinkedinIn} Target="https://www.linkedin.com/"/>
          <SocialMedia Logo={FaGithub} Target="https://github.com"/>
        </section>
      </div>
      <div className="text-center text-dark p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
        © 2023 Shiop
      </div>
    </footer>
    </div>

    );
  };
  
  export default Footer;
  