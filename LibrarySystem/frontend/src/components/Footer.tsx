import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="tm-bg-deep_blue-green pt-5 pb-3 tm-text-gray tm-footer">
      <div className="container-fluid tm-container-small footer-position">
        <span>
          <Link to="/privacypolicy" className="link">
            Cookoes隱私政策
          </Link>
          |{" "}
          <Link to="####" className="link">
            最新更新
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
