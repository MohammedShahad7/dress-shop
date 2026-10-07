import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        {import.meta.env.VITE_STORE_NAME}
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/shop">
          Shop
        </Link>

        <Link to="/cart">
          Cart 🛒
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;