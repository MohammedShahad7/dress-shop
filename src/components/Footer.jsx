import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div>
          <h2>{import.meta.env.VITE_STORE_NAME}</h2>

          <p>
            Fashion that fits your style.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/shop">
            Shop
          </Link>

          <Link to="/cart">
            Cart
          </Link>
        </div>

        <div>
          <h3>Contact</h3>

          <p>
            📱 {import.meta.env.VITE_STORE_PHONE}
          </p>

          <p>
            📧 {import.meta.env.VITE_STORE_EMAIL}
          </p>
        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 {import.meta.env.VITE_STORE_NAME}. All rights reserved.
        </p>

        <Link
          to="/admin"
          className="admin-link"
        >
          Admin Login
        </Link>

      </div>

    </footer>
  );
}

export default Footer;